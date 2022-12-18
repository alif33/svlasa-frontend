import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { showErr } from "../__lib__/helpers/ErrHandler";
import { updateData } from "../__lib__/helpers/HttpService";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logedIn } from "../store/user/actions";
import { Toaster, toast } from "react-hot-toast";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [passwordShow, setPasswordShow] = useState(true);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const onError = (err) => showErr(err);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    setDisabled(true);
    updateData("/update-password", data, params.token)
    .then((res) => {
      setDisabled(false);
      if (res?.success) {
        toast.success(`${res.message}`);
        reset();
        navigate("/sign-in");
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
            <h2 className="text-center">Update Password</h2>

            <form onSubmit={handleSubmit(onSubmit, onError)} className="w-100">
              <div className="sign-form-group">
                <label htmlFor="password">Password</label>
                <div className="with-icon-input">
                  <input
                    id="password"
                    type={passwordShow ? "password" : "text"}
                    placeholder="*******"
                    {...register("password", {
                      required: "Password is required.",
                    })}
                  />
                  <img src="/img/icon/lock.png" alt="password icon" />
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
              <div className="sign-form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="with-icon-input">
                  <input
                    id="confirmPassword"
                    type={confirmPasswordShow ? "password" : "text"}
                    placeholder="*******"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required.",
                    })}
                  />
                  <img src="/img/icon/lock.png" alt="password icon" />
                  {confirmPasswordShow ? (
                    <AiOutlineEye
                      onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                    />
                  )}
                </div>
              </div>
              <button className="sign-btn" disabled={disabled}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
