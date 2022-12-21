import React, { 
    useEffect, 
    useState
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";

import {
  authPost,
  _getData,
} from "../__lib__/helpers/HttpService";
import moment from "moment";

const Session = () => {
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [session, setSession] = useState();
  const { user, sessions } = useSelector((state) => state);
  const dispatch = useDispatch();
  const star = [1,2,3,4,5];
  const params = useParams();
  const navigate = useNavigate();
  const { __u__ } = user;
  const { sessionsList } = sessions;
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(() => {
    _getData(`/session?_id=${params._id}`, __u__.token)
        .then(res=>{
          setLoading(false);
          setSession(res);
        })
  }, []);


  const onSubmit = (data) => {
    if(data.comment.length > 0 && rating > 0){
      authPost(`/comment?_id=${params._id}`, {...data, rating}, __u__.token).then((res) => {
        if (res?.success) {
          reset();
          setRating(0);
          navigate('/dashboard');
        }
      });
    }else{
      if(data.comment.length === 0){
        toast.error("Select a comment")
      }
      if(rating === 0){
        toast.error("Take your rating")
      }
    }
  };
  

  return (
    <div className="profile-page">
      <Navbar />
      {
        loading? (
          <h1>loading</h1>
        ):(
          <div className="container-fluid2 mt-5 py-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="sessions-time-card">
                      <h5>{ moment(session._date).format("llll").split("12")[0] }</h5>
                      <h5>{ moment(session._time, ["hh:mm A"]).format("hh:mm A") } IST </h5>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="sessions-time-card">
                        <h6>Created by:</h6>
                        <h5 className="sub-heading mb-2">{session._owner.firstName} {session._owner.lastName}</h5>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="sessions-time-card">
                        <h6>Participator:</h6>
                        <h5 className="sub-heading mb-2">{session._participator.firstName} {session._participator.lastName}</h5>
                    </div>
                </div>
            </div>
            <form 
              className="row pt-5"
              onSubmit={handleSubmit(onSubmit)}
            >
                <div className="col-md-6">
                    <div className="form-group pr-5">
                        <label htmlFor="exampleFormControlTextarea">Comment</label>
                        {/* <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea> */}
                        <select 
                          {...register("comment")} 
                          className="form-control" 
                          id="exampleFormControlTextarea"
                        >
                          <option value="">Select comment</option>
                          <option value="Outstanding!">Outstanding!</option>
                          <option value="Amazing!">Amazing!</option>
                          <option value="Fabulous!">Fabulous!</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <h5>Rating</h5>
                    <span className="pt-3">
                    {
                        star.map((val, index)=><BsFillStarFill
                            key={index} 
                            onClick={()=>setRating(val)} 
                            className="mr-2" 
                            role="button" 
                            color={rating >= val?"#ffa500": "#efefef"} 
                        />)
                    }
                    </span>
                </div>
                <button type="submit" className="btn btn-submit mx-auto d-block btn-lg mt-5">Submit</button>
            </form>
          </div>
        )
      }
    </div>
  );
};

export default Session;
