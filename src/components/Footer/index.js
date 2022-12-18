import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className="footer">
            <div className="container-fluid2">
                <div className="row">
                    <div className="col-md-2">
                        <img height="61" width="196" src="/img/logo.png" alt="" />
                    </div>
                    <div className="col-md-2 ms-auto">
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="/" >
                                <img height="51" width="51" src="/img/icon/facebook.png" alt="" />
                            </Link>
                            <Link href="/" >
                                <img height="51" width="51" src="/img/icon/twitter.png" alt="" />
                            </Link>
                            <Link href="/" >
                                <img height="51" width="51" src="/img/icon/instagram.png" alt="" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid2 ">
                <div className="row">
                    <div className="col-md-6">
                        <p className="desc mt-5">Practise communication skills with your peers to become more confident and successful in your professional and personal life.</p>
                    </div>
                </div>
            </div>
            <div className="container-fluid2">
                <div className="footer-link">
                    <div className="row">
                        <div className="col-md-7 m-auto">
                            <ul>
                                <li>
                                    © All Rights Reserved 2022
                                </li>
                                <li>
                                    <Link href="/">
                                        Terms and Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/">
                                        Privacy Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Footer;