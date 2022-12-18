import React from "react";

const Card = ({ img, title, desc, color }) => {
  return (
    <div className="col-md-3 col-sm-12">
      <div className="step-card">
        <div style={{ background: color }}>
          <img src={img} alt="" />
        </div>
        <h3>{title} </h3>
        <p>{desc} </p>
      </div>
    </div>
  );
};

export default Card;