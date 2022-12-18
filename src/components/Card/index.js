import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { setMeeting } from "../../store/sessions/actions";
import { authPost, updateData, socket } from "../../__lib__/helpers/HttpService";

const Card = ({ _id, _oid, fetchData }) => {
  const [active, setActive] = useState(true);
  const { user, sessions } = useSelector((state) => state);
  const { __u__ } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCancel = (close) => {
    updateData(
      `/session?_id=${_id}&status=${_oid===__u__.info._id? "CANCELLED": "OPEN"}`,
      {},
      __u__.token
    ).then((res) => {
      if (res.success) {
        toast.success(res.message);
        fetchData();
      }
    });
  };

  const handleJoin = ()=>{
    authPost(`/joining?_id=${_id}&user=${__u__.info._id}`,
    {}, __u__.token)
      .then(res =>{
        if(res.success){
          const {appId, channel, token }= res.session.agora;
          dispatch(setMeeting({appId, channel, token, uid: 0}));
          navigate(`/meeting/${channel}`);
        }
      })
  }

  console.log(sessions);

  return (
    <>
        <button onClick={handleJoin} className="book-b">Join</button>
        <Popup
            trigger={<button className="modal-cancel-btn">Cancel</button>}
            modal
            nested
            >
            {(close) => (
                <div>
                <button className="close" onClick={close}>
                    &times;
                </button>
                <h4 className="sub-heading text-center">
                    Are you sure you want to cancel?
                </h4>
                <div className="row mt-4">
                    <div className="col-md-6">
                    <button onClick={close} className="main-btn w-100">
                        No
                    </button>
                    </div>
                    <div className="col-md-6">
                    <button
                        onClick={() =>{
                            handleCancel();
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
    </>
  );
};

export default Card;
