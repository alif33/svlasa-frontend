import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";

export default function ContactUs() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();


  const onSubmit = (data) => {
    console.log(data);
    // console.log(data);
    // setDisable(true);
    // postData(`/contact`, data)
    //   .then((res) => {
    //     console.log("contact-us", res);
    //     setDisable(false);
    //     if (res.success) {
    //       toast.success(`${res.message}`);
    //       reset();
    //     }
    //   })
    //   .catch((err) => {
    //     setDisable(false);
    //   });
  };


  return (
    <div className="home_page">
      <Navbar />
        <div className="contact-form mt-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <input
                {...register("name", { required: true })} 
                type="text" 
                className="form-control" 
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <input 
                {...register("email", { required: true })}
                type="email" 
                className="form-control" 
                placeholder="Your email-address"
              />
            </div>
            <div className="form-group">
              {/* <label for="exampleInputPassword1">Password</label> */}
              <textarea 
                {...register("message", { required: true })}
                rows={4}
                className="form-control"
                placeholder="Message"/>
            </div>
            <button type="submit" className="btn btn-submit">Submit</button>
          </form>
        </div>
      <Footer />
    </div>
  );
}
