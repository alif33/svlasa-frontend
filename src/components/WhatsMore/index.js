import React from "react";

const WhatsMore = () => {
  return (
    <div className="whats-more">
      <div className="">
        <div className="row">
          <div className="col-md-10 m-auto">
            <h2 className="heading text-center">What&apos;s more?</h2>
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
          <div className="col-md-6">
            <div className="header-right"></div>
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="whats-more-list">
              <ul>
                <li className="gap-1">
                  <img className="" src="/img/icon/check.png" alt="" />{" "}
                  <p>Get access to sample question to practise</p>{" "}
                </li>
                <li className="gap-1">
                  <img src="/img/icon/check.png" alt="" />{" "}
                  <p>
                    Get framework to stay on track and get the most out of your
                    30 minutes session.
                  </p>{" "}
                </li>
                <li className="gap-1">
                  <img src="/img/icon/check.png" alt="" />{" "}
                  <p>
                    Get one free session from experts after every fiver peer
                    sessions.
                  </p>{" "}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsMore;
