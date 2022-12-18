// import { useSelector } from "react-redux";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import HowItWorks from "../components/HowItWorks";
import WhatsMore from "../components/WhatsMore";
import OurStory from "../components/OurStory";
import Footer from "../components/Footer";

export default function Home() {
//   const { user } = useSelector((state) => state);

  return (
    <div className="home_page">
      <Navbar />
      <Header />
      <HowItWorks />
      <WhatsMore />
      <OurStory />
      <Footer />
    </div>
  );
}
