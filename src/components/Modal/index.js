import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { updateData } from "../../__lib__/helpers/HttpService";

const Modal = ({ fetchData }) => {

  useEffect(()=>{
    // console.log("New Id", _id);
  }, [])

  const { user } = useSelector((state) => state);
  const { __u__ } = user;

  const handleCancel = (close) => {
    // updateData(
    //   `/user/session?_id=${_id_}&status=${
    //     _id_ === __u__.info._id ? "CANCELLED" : "OPEN"
    //   }`,
    //   {},
    //   __u__.token
    // ).then((res) => {
    //   if (res.success) {
    //     console.log(res);
    //     toast.success(res.message);
    //     fetchData();
    //     close();
    //   }
    // });
  };
  return (
    <>
    <Popup
      trigger={<button  className="modal-cancel-btn">Cancel</button>}
      modal
      nested
    >
      {(close) => (
        <div>
          <button className="close" onClick={close}>
            &times;
          </button>
          <h4 className="sub-heading text-center">
            Are you sure you want to cancel?
          </h4>
          <div className="row mt-4">
            <div className="col-md-6">
              <button onClick={close} className="main-btn w-100">
                No
              </button>
            </div>
            <div className="col-md-6">
              <button
                onClick={() => handleCancel(close)}
                className="main-outline-btn w-100"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
    </>
  );
};

export default Modal;
