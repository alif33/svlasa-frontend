import React, { useEffect, useState } from "react";
import AgoraUIKit from 'agora-react-uikit';
import { useNavigate, useParams } from "react-router-dom";
import { FiVideo, FiVideoOff } from "react-icons/fi";
import { MdCallEnd } from "react-icons/md";
import { BiVolumeMute, BiVolumeFull } from "react-icons/bi";
import Popup from "reactjs-popup";
import AgoraRTC from "agora-rtc-sdk-ng"
import { DotLoader } from "react-spinners";
import { 
  authPost, 
  socket, 
  _getData 
} from "../__lib__/helpers/HttpService";
import { useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";

const override = {
  display: "block",
  margin: "0 auto",
  marginTop: "200px",
  borderColor: "red",
};

const Meeting = ()=>{
  const [agoraEngine, setAgoraEngine] = useState(
      AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }
    ));
  const [ended, setEnded] = useState(false);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [loading, setLoading] = useState(true);
  const [camera, setCamera] = useState(true);
  const [volume, setVolume] = useState(true);
  const [videoCall, setVideoCall] = useState(true);
  const { sessions } = useSelector(state=>state);
  const { meeting } = sessions;
  const params = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state);
  const { __u__ } = user;

  const[channelParameters, setChannelParameters] = useState({
    localAudioTrack: null,
    localVideoTrack: null,
    remoteAudioTrack: null,
    remoteVideoTrack: null,
    remoteUid: null,
  });

  async function createLocalTracks(){
    const [microphoneTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);
    return {microphoneTrack, cameraTrack};
  }

 
  async function subscribe(){
    agoraEngine.on("user-published", async (user, mediaType) =>{
      await agoraEngine.subscribe(user, mediaType);
      
      if (mediaType == "video"){
        await setChannelParameters({
          ...channelParameters,
          remoteVideoTrack: user.videoTrack,
          remoteAudioTrack: user.audioTrack,
          remoteUid: user.uid.toString(),
          remoteUid: user.uid.toString(),
        })
        
        user.videoTrack.play(document.getElementById("remotePlayer"));
      }
      if (mediaType == "audio"){
        await setChannelParameters({
          ...channelParameters,
          remoteAudioTrack : user.audioTrack
        })
        user.audioTrack.play();
      }
      agoraEngine.on("user-unpublished", user =>{
          console.log(user.uid+ "has left the channel");
      });
    });
  }


  async function joinCall(){
    await agoraEngine.join(meeting.appId, meeting.channel, meeting.token, meeting.uid);
    const {microphoneTrack, cameraTrack} = await createLocalTracks();
    await agoraEngine.publish([microphoneTrack, cameraTrack]);
    cameraTrack.play(document.getElementById("localPlayer"));
  }

  async function leaveCall()
  {
      localAudioTrack.close();
      localVideoTrack.close();
      await agoraEngine.leave();
      window.location.reload();
  }

  
  const handleMic = ()=>{
    if(volume) {
      localAudioTrack.setEnabled(false);
      setVolume(!volume);
    }else{
      localAudioTrack.setEnabled(true);
      setVolume(!volume);
    }
  }

const handleCamera = ()=>{
  if(camera){
    localVideoTrack.setEnabled(false);
    setCamera(!camera);
  }else{
    localVideoTrack.setEnabled(true);
    setCamera(!camera);
  }
}


const handleBack = async()=>{
  await leaveCall();
  navigate(`/dashboard`);
}


const handleLeave = async()=>{
    authPost(`/ended?_id=${params.channel}`,{}, __u__.token)
    .then(res=>{
      leaveCall();
      if(res.completed){
        if(res.session._owner !== __u__.info._id){
          navigate(`/session/${params.channel}`);
        }else{
          navigate(`/dashboard`);
        }
      }else{
        navigate(`/dashboard`);
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }



  useEffect(()=>{
    subscribe();
    setLoading(false);
    joinCall();
    authPost(`/active?_id=${params.channel}`,{}, __u__.token)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })

  }, [])


  useEffect(()=>{
    socket.on(`${params.channel}`, (data) => {
        if(data.end){
          setEnded(true);
        }
      });
  },[socket])


  return(
    <div className="video-call">
      {
       ended && <h3 className="text-leave text-center text-danger my-4">Your partner has leave. Are you wanna <span role="button" onClick={handleLeave}>leave</span>? </h3>
      }
      {
        loading? (
          <DotLoader color="#bd5d59" loading={loading} cssOverride={override} />
        ):(
          <div className={`container-fluid2 ${ended? "mb-5": "my-5"}`}>
          <div className="video-call-part">
            <div className="row h-100">
              <div className="col-md-8 h-100">
                <div className="video-recevier-part">
                  <div id="remotePlayer" className="remotePlayer"></div>
                  <div className="video-icon mt-5">
                    {!camera ? (
                      <button onClick={() => handleCamera()}>
                        {" "}
                        <FiVideoOff />
                      </button>
                    ) : (
                      <button onClick={() => handleCamera()}>
                        {" "}
                        <FiVideo />
                      </button>
                    )}
                    <Popup
                      trigger={<button className="call-cencel">
                      {" "}
                      <MdCallEnd />
                    </button>}
                      modal
                      nested
                      >
                      {(close) => (
                          <div>
                          <button className="close" onClick={close}>
                              &times;
                          </button>
                          <h4 className="sub-heading text-center">
                              Are you wanna leave?
                          </h4>
                          <div className="row mt-4 pt-5">
                              <div className="col-md-6">
                              <button onClick={close} className="main-btn w-100">
                                  No
                              </button>
                              </div>
                              <div className="col-md-6">
                              <button
                                  onClick={() =>{
                                      handleLeave();
                                      close();
                                  }}
                                  className="main-outline-btn w-100"
                              >
                                  Yes
                              </button>
                              </div>
                          </div>
                          </div>
                      )}
                  </Popup>
                    {!volume ? (
                      <button onClick={() => handleMic()}>
                        {" "}
                        <BiVolumeMute />
                      </button>
                    ) : (
                      <button onClick={() => handleMic()}>
                        {" "}
                        <BiVolumeFull />
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-md-4 px-4">
                <div className="user-img">
                  <div id="localPlayer" className="localPlayer"></div>
                  {/* <img src="/img/user-img.png" alt="" className="w-100" /> */}
                  <div className="rules my-4">
                    <div className="rules-item">
                      <h5 className="sub-heading2 desc">Rules:</h5>
                      <h5 className="sub-heading2">
                        Be a good citizen. Arrive on time.
                      </h5>
                    </div>
                    <div className="rules-item mt-3">
                      <h5 className="sub-heading2 desc">Need help?</h5>
                      <h5 className="sub-heading2">
                        Icebeaker questions how make sessions more effective?
                      </h5>
                    </div>
                    <div className="rules-item mt-3">
                      <h5 className="sub-heading2 desc">
                        Need feedback from expert?
                      </h5>
                      <h5 className="sub-heading2">
                        Talk to one of our in-house experts.
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      }

    </div>
  )
}
export default Meeting;