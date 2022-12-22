import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logedIn } from "../store/user/actions";
import { postData, updateData } from "../__lib__/helpers/HttpService";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";

const Profile = props => {
  const { user, sessions } = useSelector((state) => state);
  const { sessionsList } = sessions;
  const { __u__ } = user;
  const [hobby, setHobby] = useState();
  const [image, setImage] = useState(user?.__u__?.info?.image);
  const dispatch = useDispatch();
  const token = user?.__u__?.token;
  let hobbiesGet = user?.__u__?.info?.hobbies;

  const [firstName, setFirstName] = useState(user?.__u__?.info?.firstName);
  const [lastName, setLastName] = useState(user?.__u__?.info?.lastName);
  const [timezone, setTimeZone] = useState(user?.__u__?.info?.timezone);
  const [hobbies, setHobbies] = useState(user?.__u__?.info?.hobbies);
  const [_about, setAboutMe] = useState(user?.__u__?.info?._about);
  const [_inspiration, setInspiration] = useState(user?.__u__?.info?._inspiration);
  const [isReload, setIsReload] = useState(false);

  const navigate = useNavigate();

  const ImageHandler = async file => {
    console.log(file[0]);
    if (file.length > 0) {
      const formData = new FormData();
      await formData.append("image", file[0]);
      postData("/upload", formData)
        .then((res) => {
          if (res.success) {
            console.log(res.image);
            const { secure_url } = res.image;
            setImage(secure_url);
          }
        })
        .catch((err) => {
          console.log("ImageHandler-formData", err);
        });
    }
  };

  const addHobbies = (event) => {
    if (event.key === "Enter") {
      if(hobby && hobby.length>0){
        setHobbies([...hobbies, hobby]);
        document.getElementById("Hobby").value = "";
        setHobby();
      }
    }
  };

  const handleHobbies = (_hobby) => {
   const exHobbies = hobbies.filter(
    hobby => hobby !== _hobby);
    setHobbies(exHobbies);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (event.key !== "Enter") {
      updateData(
        "/update-profile",
        {
          firstName,
          lastName,
          timezone,
          image,
          _about, 
          _inspiration, 
          hobbies
        },
        token
      ).then((res) => {
        if (res?.success) {
          const { token, info } = res;
          console.log(res, "ALLOW");
          dispatch(
            logedIn({
              token,
              info,
            })
          );
          toast.success(res.message);
        }
      });
    }
  };

  return (
    <>
      <div className="profile-page">
        <Navbar />
        <div className="profile-bg mt-4">
          <div className="container-fluid2">
            <div className="row">
              <div className="col-md-12">
                <img src="/img/profile-bg.png" alt="user profile" />
              </div>
            </div>
          </div>
        </div>
        <div className="profile-pic-and-name">
          <div className="container-fluid2">
            <div className="row">
              <div className="col-md-7">
                <div className="profile-pic">
                  <div className="pic">
                    <img
                      className="avatar"
                      height="150"
                      width="150"
                      src={image? image: "/img/avatar.jpg"}
                      alt="avatar"
                    />
                    <div className="upload-avatar">
                      <div className="icon-wrapper">
                        <input
                          className="upload-input"
                          type="file"
                          onChange={(e) => ImageHandler(e.target.files)}
                          />
                        <img 
                          height="30px" 
                          width="30px" 
                          src="/img/icon/upload.png" 
                          alt="upload icon" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="profile-name">
                    <h4 className="sub-heading mt-2">
                      {user?.__u__?.info?.firstName +
                        " " +
                        user?.__u__?.info?.lastName}
                    </h4>
                    <p className="desc2 mt-2">
                      {" "}
                      <img
                        height="15"
                        width="16.67"
                        src="/img/icon/message2.png"
                        alt=""
                      />{" "}
                      {user?.__u__?.info?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="text-end">
                  {
                      sessionsList && sessionsList?.completedSessions && (
                        <h4 className="sub-heading mt-2">Sessions Completed: {sessionsList && sessionsList.completedSessions.length}</h4>
                      )
                  }
       
                  {
                    timezone && (
                      <p className="desc2 mt-2">
                        {" "}
                        <img
                          height="15"
                          width="16.67"
                          src="/img/icon/clock.png"
                          alt=""
                        />{" "}
                        Time Zone: {timezone}
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <form> */}
        <div className="about-section">
          <div className="container-fluid2">
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label className="desc2" htmlFor="firstName">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    className="form-control py-4 fs-2"
                    type="text"
                    name="firstName"
                    defaultValue={firstName}
                    onChange={e=>setFirstName(e.target.value)}
                />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="desc2" htmlFor="lastName">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    className="form-control py-4 fs-2"
                    type="text"
                    name="lastName"
                    defaultValue={lastName}
                    onChange={e=>setLastName(e.target.value)}
                />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label className="desc2" htmlFor="timezone">
                    Time Zone
                  </label>
                  <input
                    id="timezone"
                    className="form-control py-4 fs-2"
                    type="text"
                    name="timezone"
                    defaultValue={timezone}
                    onChange={e=>setTimeZone(e.target.value)}
                />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="desc2" htmlFor="aboutMe">
                    About me
                  </label>
                  <textarea
                    id="aboutMe"
                    className="form-control"
                    rows="3"
                    defaultValue={_about}
                    onChange={(e) => setAboutMe(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="border my-2"></div>
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <label className="desc2" htmlFor="aboutMe">
                    Why I am here?
                  </label>
                  <textarea
                    id="aboutMe"
                    className="form-control"
                    rows="3"
                    defaultValue={_inspiration}
                    onChange={(e) => setInspiration(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="border my-2"></div>
            <div className="row">
              <div className="col-md-12">
                <h3 className="text-dark">Hobbies</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <span className="d-flex py-2">
                  {hobbies.map((hobbie, index) => (
                    <div
                      key={index}
                      className="mx-2 px-2 py-1 rounded bg-dark shadow-lg"
                    >
                      <h6 className="sub-heading2 d-inline  text-light">
                        {hobbie}{" "}
                        <span
                          type="button"
                          className="border-0 ps-2 text-secondary "
                          onClick={() => handleHobbies(hobbie)}
                        >
                          x
                        </span>
                      </h6>
                    </div>
                  ))}
                </span>
              </div>
              <div className="col-md-4 mt-3">
                <input
                  id="Hobby"
                  className="form-control py-4 fs-2"
                  rows="3"
                  type="text"
                  name="hobbies"
                  value={hobby}
                  onChange={e=>setHobby(e.target.value)}
                  onKeyDown={addHobbies}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-buttom-section py-5">
          <div className="container-fluid2">
            <div className="row">
              <div className="col-md-12 ms-auto">
                <div className="text-end d-flex justify-content-end align-items-center float-right">
                  <p onClick={()=>navigate("/")} className="desc2 mr-3">Skip</p>
                  <button onClick={ handleUpdate } className="main-btn">
                    Save & Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
    </>
  );
};

export default Profile;