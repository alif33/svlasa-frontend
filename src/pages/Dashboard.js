import React, { 
    useEffect, 
    useState 
} from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import SessionCard from "../components/SessionCard";
import { DotLoader } from "react-spinners";
// import RTC from "re"
import { decrypt, encrypt } from "../__lib__/helpers/Validator";
import {
  authPost,
  _getData,
  updateData,
  socket
} from "../__lib__/helpers/HttpService";
import { setSessions } from "../store/sessions/actions";
import Card from "../components/Card";
import Item from "../components/Item";
import OwnSessions from "../components/OwnSessions";
import SessionBoard from "../components/SessionBoard";


const override = {
  display: "block",
  margin: "0 auto",
  marginTop: "200px",
  borderColor: "red",
};

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [disable, setDisabled] = useState();
  const { user, sessions } = useSelector((state) => state);

  const dispatch = useDispatch();

  const { __u__ } = user;
  const { sessionsList } = sessions;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchData = () => {
    _getData("/sessions", __u__.token)
    .then((ses) => {
      dispatch(setSessions(ses));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const onError = (err) => {
    console.log(err);
  };

  const onSubmit = (data) => {
    setDisabled(true);
    authPost("/session", data, __u__.token).then((res) => {
      if (res?.success) {
        toast.success(`${res.message}`);
        reset();
        fetchData();
      }
    });
  };

  return (
    <div className="profile-page">
      <Navbar />
      {
        loading ? (
          <DotLoader color="#bd5d59" loading={loading} cssOverride={override} />
        ):(
          <>
          <SessionBoard/>
          <div className="container-fluid2">
            <div className="row">
              <div className="col-md-6">
                <div className="table-card mt-5">
                  <h4 className="sub-heading">
                    Available session from other peers
                  </h4>
    
                  {!sessions.sessionsList ? (
                    <div
                      style={{ marginTop: "200px" }}
                      className="d-flex justify-content-center align-items-center pt-5"
                    >
                      <div
                        style={{ width: "5rem", height: "5rem" }}
                        className="spinner-grow"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <table className="table table-bordered rounded mt-2">
                      <thead className="thead-color">
                        <tr>
                          <th scope="col">Time</th>
                          <th scope="col">Peer</th>
                          <th scope="col">More Info</th>
                        </tr>
                      </thead>
    
                      <tbody>
                        {sessionsList &&
                          sessionsList.participateSessions &&
                          sessionsList.participateSessions?.map(
                            (item, index) => <Item 
                              key={index} 
                              item={item} 
                              own={true}
                              fetchData={fetchData}
                          />)}
    
                        {sessionsList &&
                          sessionsList._ownSessions?.map(
                            (item, index) => <Item 
                              key={index} 
                              item={item} 
                              own={true}
                              fetchData={fetchData}
                            />)}
    
                        {sessionsList &&
                          sessionsList.ownSessions?.map(
                          (item, index) =><Item 
                            key={index} 
                            item={item} 
                            own={true}
                            fetchData={fetchData}
                          />)}
    
                        {sessionsList &&
                          sessionsList.sessions?.map(
                            (item, index) => {
                              if(item._owner._id !== __u__.info._id){
                                return(
                                  <Item 
                                    key={index} 
                                    item={item} 
                                    own={false}
                                    fetchData={fetchData}
                                  />
                                )
                              }
                            })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              <OwnSessions/>
            </div>
          </div>
    
          <div className="container-fluid2 mb-4">
            <h4 className="sub-heading my-2">Add a session</h4>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="row mt-2">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="timeSlot">Time Slot</label>
                    <input
                      id="timeSlot"
                      type="time"
                      className="form-control"
                      placeholder="7:00AM IST"
                      {...register("_time", {
                        required: "Email is required.",
                      })}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="dateSlot">Date</label>
                    <input
                      id="dateSlot"
                      type="date"
                      className="form-control"
                      placeholder="24/05/2022"
                      {...register("_date", {
                        required: "Email is required.",
                      })}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="dateSlot">Time Zone</label>
                    <select className="form-control zone-input" aria-label="Default select example">
                      <option selected>Open this select menu</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="Note">Note for partner</label>
                    <textarea
                      id="Note"
                      className="form-control"
                      {...register("_note", {
                        required: "Email is required.",
                      })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <button className="main-btn">Submit</button>
                </div>
              </div>
            </form>
          </div>
          </>
        )
      }


    </div>
  );
};

export default ProfilePage;
