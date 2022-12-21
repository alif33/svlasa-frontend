import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { showErr } from "../__lib__/helpers/ErrHandler";
import { postData } from "../__lib__/helpers/HttpService";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const SignUp = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onError = (err) => showErr(err);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setDisabled(true);
    postData("/register", data).then((res) => {
      if (res?.success) {
        setDisabled(false);
        reset();
        toast.success(res.message);
        navigate("/sign-in");
      }
    })
    .catch(err=>{
      setDisabled(false);
    })
  };

  console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

  return (
    <>
      <div className="sign-up-main-section">
        <div className="sign-banner-section">
          <div className="sign-banner text-center">
            <img src="/img/sign-up-banner.png" alt="" />
          </div>
          <div className="unfurl-img mt-3">
            <img height="61" width="196" src="/img/unfurl.png" alt="" />
            <div className="sign-banner-text mt-2">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet,
                nunc enim posuere consequat at ut netus pellentesque. Lorem
                vitae euismod gravida sagittis..
              </p>
            </div>
          </div>
        </div>
        {/* <Toaster position="top-center" reverseOrder={false} /> */}
        <Toaster
          toastOptions={{
            className: "",
            style: {
              padding: "20px",

              fontSize: "15px",
            },
          }}
        />
        <div className="sign-form-section">
          <div className="sign-up-form">
            <h2 className="text-center">Sign Up</h2>

            <form className="w-100" onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="sign-form-group">
                <label htmlFor="firstName">First Name</label>
                <div className="with-icon-input">
                  <input
                    id="firstName"
                    type="text"
                    placeholder="john"
                    {...register("firstName", {
                      required: "Email is required.",
                    })}
                  />
                  <img src="/img/icon/man.svg" alt="" />
                </div>
              </div>
              <div className="sign-form-group">
                <label htmlFor="lastName">Last Name</label>
                <div className="with-icon-input">
                  <input
                    id="lastName"
                    type="text"
                    placeholder="doe"
                    {...register("lastName", {
                      required: "Email is required.",
                    })}
                  />
                  <img src="/img/icon/man.svg" alt="" />
                </div>
              </div>

              <div className="sign-form-group">
                <label htmlFor="email">Email</label>
                <div className="with-icon-input">
                  <input
                    id="email"
                    type="email"
                    placeholder="john@gmail.com"
                    {...register("email", {
                      required: "Email is required.",
                    })}
                  />
                  <img src="/img/icon/message.png" alt="" />
                </div>
              </div>

              <div className="sign-form-group">
                <label htmlFor="email">Password</label>
                <div className="with-icon-input">
                  <input
                    id="email"
                    type={passwordShow ? "password" : "text"}
                    placeholder="*******"
                    {...register("password", {
                      required: "Password is required.",
                    })}
                  />
                  <img src="/img/icon/lock.png" alt="" />
                  {passwordShow ? (
                    <AiOutlineEye
                      onClick={() => setPasswordShow(!passwordShow)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={() => setPasswordShow(!passwordShow)}
                    />
                  )}
                </div>
              </div>
              <button disabled={disabled} className="sign-btn">
                Sign Up
              </button>
            </form>

            <div className="or-line">
              <div></div>
              <p>or</p>
              <div></div>
            </div>

            <div className="social-link">
              <Link href="/">
                  <img
                    height="79"
                    width="79"
                    src="/img/icon/facebook.png"
                    alt=""
                  />
              </Link>
              <Link href="/">
                  <img
                    height="79"
                    width="79"
                    src="/img/icon/twitter.png"
                    alt=""
                  />
              </Link>
              <Link href="/">
                  <img
                    height="79"
                    width="79"
                    src="/img/icon/instagram.png"
                    alt=""
                  />
              </Link>
            </div>

            <div className="text-center already-user-text">
              <h4>
                Already a user?{" "}
                <Link to="/sign-in">
                  Sign In
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
