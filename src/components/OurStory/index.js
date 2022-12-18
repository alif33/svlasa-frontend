import React from "react";

const OurStory = () => {
  return (
    <div className="our-story">
      <div className=" mb-3">
        <div className="row">
          <div className="col-md-10 m-auto">
            <h2 className="heading text-center">Our Story</h2>
            <p className="desc text-center mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor
            </p>
          </div>
        </div>
      </div>
      <div className="container-fluid2 mt-5">
        <div className="row">
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="header-left">
              <h4 className="sub-heading mb-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                aliquam, purus sit amet luctus venenatis, lectus magna fringilla
                urna, porttitor rhoncus dolor purus non enim praesent elementum
                facilisis leo, vel fringilla est ullamcorper eget nulla facilisi
                etiam.
              </h4>
              <button className="main-btn">Explore more</button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="header-right">
              <img
                height="539"
                width="539"
                src="/img/sign-up-banner.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
