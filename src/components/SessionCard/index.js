import React from 'react';

const SessionCard = ({ time, text }) => {
    return (
        <div className="col-md-4">
            <div className="sessions-time-card">
                <h4 className="sub-heading mb-2">{time}</h4>
                <p className="desc2">{text}</p>
            </div>
        </div>
    );
};

export default SessionCard;