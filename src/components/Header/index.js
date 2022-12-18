import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <div className="container-fluid2">
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="header-left">
                            <h2 className="heading">Open yourself
                                to new possibilities</h2>
                            <p className="desc">Practise communication skills with your peers to become more confident and successful in your professional and personal life.</p>
                            <button className="main-btn">Explore more</button>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="header-right">
                            <img height='539' width="539" src="/img/sign-up-banner.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;