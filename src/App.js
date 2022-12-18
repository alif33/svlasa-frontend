import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import Dashboard from "./pages/Dashboard";
import ViewProfile from "./pages/ViewProfile";
import EditProfile from "./pages/EditProfile";
import Meeting from "./pages/Meeting";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import Session from "./pages/Session";

function App() {
  return (

    // appId}/${channel}/${token
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/update-password/:token" element={<UpdatePassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile/:userName" element={<ViewProfile />} />
      <Route path="/update-profile" element={<EditProfile />} />
      <Route path="/meeting/:channel" element={<Meeting />} />
      <Route path="/session/:_id" element={<Session />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
