import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { showErr } from "../__lib__/helpers/ErrHandler";
import { postData } from "../__lib__/helpers/HttpService";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logedIn } from "../store/user/actions";
import { Toaster, toast } from "react-hot-toast";

const SignIn = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [passwordShow, setPasswordShow] = useState(true);
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
    postData("/login", data).then((res) => {
      setDisabled(false);
      if (res?.success) {
        const { token, info } = res;
        toast.success(`${res.message}`);
        dispatch(
          logedIn({
            token,
            info,
          })
        );
        reset();
        navigate("/dashboard");
      }
    });
  };

  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            padding: "20px",
            fontSize: "15px",
          },
        }}
      />
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
        <div className="sign-form-section">
          <div className="sign-up-form">
            <h2 className="text-center">Sign In</h2>

            <form onSubmit={handleSubmit(onSubmit, onError)} className="w-100">
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
              <button className="sign-btn" disabled={disabled}>
                Sign In
              </button>

              <div className="remember-input">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    id="res-mobile-label-text"
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Remember Password
                  </label>
                </div>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
            </form>

            <div className="or-line">
              <div></div>
              <p>or</p>
              <div></div>
            </div>

            <div className="social-link">
              <Link to="/">
                  <img
                    height="79"
                    width="79"
                    src="/img/icon/facebook.png"
                    alt=""
                  />
              </Link>
              <Link to="/">
                  <img
                    height="79"
                    width="79"
                    src="/img/icon/twitter.png"
                    alt=""
                  />
              </Link>
              <Link to="/">
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
                Haven't register yet?{" "}
                <Link to="/sign-up">
                  Sign Up
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
