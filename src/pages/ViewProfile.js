import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Navbar from "../components/Navbar";
import { getData } from "../__lib__/helpers/HttpService";
import BackArrow from "../Icon/BackArrow";

const ProfilePage = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        // console.log(params);
        getData(`/profile?userName=${params.userName}`)
            .then(res=>{
                setUser(res);
                setLoading(false);
            })
            .catch(err=>{
                console.log(err);
            })
    },[])
 
  return (
    <div className="profile-page">
      <Navbar />

      <div className="profile-bg mt-4">
        <div className="container-fluid2">
          <div className="row">
            <div className="col-md-12">
              <img
                className="profile-banner"
                src="/img/profile-bg.png"
                alt=""
              />
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
                  <div className="profile-img-responsive">
                    {" "}
                    <img
                      height="150"
                      width="150"
                      src="/img/user2.png"
                      alt=""
                    />
                  </div>
                </div>

                <div className="profile-name">
                  {
                    user?.firstName && user?.lastName && (
                      <h4 className="sub-heading mt-2 profile-name-mobile">
                        {" "}
                        {user?.firstName + " " + user?.lastName}
                      </h4>
                    )
                  }
                  
                  {
                    user?.email && <p className="desc2 mt-2"> {user?.email}</p>
                  }
                  
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

      <div className="about-section">
        <div className="container-fluid2">
          {user?._about && (
            <>
              <div className="row">
                <div className="col-md-12">
                  <p className="desc2 mb-2">About Me</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h5 className="sub-heading2">{user?._about}</h5>
                </div>
              </div>
              <div className="border my-2"></div>
            </>
          )}

          {user?._inspiration && (
            <>
              <div className="row">
                <div className="col-md-12">
                  <p className="desc2 mb-2">Why I am here</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <h5 className="sub-heading2">{user?._inspiration}</h5>
                </div>
              </div>
              <div className="border my-2"></div>
            </>
          )}
          {user?.hobbies && user?.hobbies?.length > 0 && (
            <>
              <div className="row">
                <div className="col-md-12">
                  <p className="desc2 mb-2">Hobbies</p>
                </div>
              </div>
              <div className="row">
                {user.hobbies.map((hobbie, index) => {
                  return (
                    <div key={index} className="col-md-1">
                      <h5 className="sub-heading2 ">{hobbie}{index !== user.hobbies.length-1 && ","}</h5>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="profile-buttom-section py-5">
        <div className="container-fluid2">
          <div className="row mt-3">
            <div className="col-md-12 ms-auto">
              <div className="text-end float-right">
                <button onClick={() => navigate("/")} className="main-btn">
                 Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

