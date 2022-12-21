import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { logedIn } from "../store/user/actions";
import { updateData } from "../__lib__/helpers/HttpService";
import Navbar from "../components/Navbar";
import { Toaster, toast } from "react-hot-toast";

const Profile = props => {
  const [hobby, setHobby] = useState();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);

  const token = user?.__u__?.token;
  let hobbiesGet = user?.__u__?.info?.hobbies;

  const [hobbies, setHobbies] = useState(user?.__u__?.info?.hobbies);

  const [_about, setAboutMe] = useState();

  const [_inspiration, setInspiration] = useState();
  const [isReload, setIsReload] = useState(false);

  const navigate = useNavigate();

  const addHobbies = (event) => {
    if (event.key === "Enter") {
      if(hobby && hobby.length>0){
        setHobbies([...hobbies, hobby]);
        setHobby();
        console.log(document.getElementById("Hobby"));
      }
    }
  };

  const handleHobbies = (_hobby) => {
   const exHobbies = hobbies.filter(hobby =>hobby !== _hobby);
    setHobbies(exHobbies);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    if (event.key !== "Enter") {
      console.log("ddddd", event.key);
      updateData(
        "/update-profile",
        { _about, _inspiration, hobbies },
        token
      ).then((res) => {
        if (res?.success) {
          const { token, info } = res;
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
                <img src="/img/profile-bg.png" alt="" />
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
                      height="150"
                      width="150"
                      src="/img/user2.png"
                      alt=""
                    />
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
                  <h4 className="sub-heading mt-2">Sessions Completed: 20</h4>
                  <p className="desc2 mt-2">
                    {" "}
                    <img
                      height="15"
                      width="16.67"
                      src="/img/icon/clock.png"
                      alt=""
                    />{" "}
                    Time Zone +05:30 IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <form> */}
        <div className="about-section">
          <div className="container-fluid2">
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
                    defaultValue={user?.__u__?.info?._about}
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
                    defaultValue={user?.__u__?.info?._inspiration}
                    onChange={(e) => setInspiration(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="border my-2"></div>
            <div className="row">
              <div className="col-md-12">
                <h1 className="text-dark">Hobbies</h1>
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
                      <h5 className="sub-heading2 d-inline  text-light">
                        {hobbie}{" "}
                        <span
                          type="button"
                          className="border-0 ps-2 text-secondary "
                          onClick={() => handleHobbies(hobbie)}
                        >
                          x
                        </span>
                      </h5>
                    </div>
                  ))}
                </span>
              </div>
              <div className="">
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