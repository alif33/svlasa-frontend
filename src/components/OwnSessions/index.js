import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { _getData } from "../../__lib__/helpers/HttpService";
import moment from "moment";
import { Link } from "react-router-dom";

const OwnSessions = () => {
    // const [sessions, setSessions] = useState([]);
    const { user, sessions } = useSelector(state=>state);
    const { __u__ } = user;
    const { sessionsList } = sessions;
    
    return (
        <div className="col-md-6">
        <div className="table-card mt-5">
        <h4 className="sub-heading">My Sessions</h4>

        <table className="table table-bordered rounded mt-2">
            <thead className="thead-color">
            <tr>
                <th scope="col">Time</th>
                <th scope="col">Peer</th>
                <th scope="col">Comments</th>
            </tr>
            </thead>

            <tbody style={{ overFlow: "scroll" }}>
                {
                    sessionsList &&
                    sessionsList.completedSessions &&
                    sessionsList.completedSessions?.map((item, index)=>(
                            <tr key={index}>
                                <td>
                                    <h5>{moment(item._date).format("llll").split("12")[0]}</h5>
                                    <h5>{moment(item._time, ["hh:mm A"]).format("hh:mm A")} IST </h5>
                                </td>
                                <td>
                                    <h5>
                                    <Link
                                        to={`/profile/${item?._participator?.userName}`}
                                    >
                                        {item?._participator?.firstName +
                                        " " +
                                        item?._participator?.lastName}
                                    </Link>
                                    </h5>
                                    <h5>
                                        {
                                            item.rating && (<><img src="/img/icon/star.png" alt="" /> {item.rating}.0</>)
                                        }
                                        
                                    </h5>
                                </td>
                                <td>
                                    <h5>{item.comment}</h5>
                                </td>
                            </tr>
                    ))
                }
            
            </tbody>
        </table>
        </div>
    </div>
    );
};

export default OwnSessions;