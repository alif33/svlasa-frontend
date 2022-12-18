import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

const SessionBoard = () => {
    const { user, sessions } = useSelector((state) => state);
    const { sessionsList } = sessions;

    return (
    
    <div className="container-fluid2 mt-5 py-5">
        <div className="row">
            {
                sessionsList && sessionsList.completedSessions && (
                    <div className="col-md-4">
                    <div className="sessions-time-card">
                        <h4 className="sub-heading mb-2 text-center">0{sessionsList.completedSessions.length}</h4>
                        <p className="desc2 text-center">Total Sessions Completed</p>
                    </div>
                </div>
            )}
            <div className="col-md-4">
                <div className="sessions-time-card">
                    <h4 className="sub-heading mb-2">20th May, 11:00AM</h4>
                    <p className="desc2">Upcoming Session</p>
                </div>
            </div>
            {
                sessionsList && sessionsList.completedSessions && sessionsList.completedSessions?.length>0 && (
                <div className="col-md-4">
                    <div className="sessions-time-card">
                        <h4 className="sub-heading mb-2">{moment(sessionsList.completedSessions[0]._date).format("lll").split("12")[0]}| {moment(sessionsList.completedSessions[0]._time, ["hh:mm A"]).format("hh:mm A")}</h4>
                        <p className="desc2">Last Session</p>
                    </div>
                </div>
                )
            }
        </div>
    </div>
    );
};

export default SessionBoard;