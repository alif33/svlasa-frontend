import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logOut } from "../../store/user/actions";

const Navbar = () => {
  const { user } = useSelector(state=>state);
  const { __u__, isUser } = user;
  const location = useLocation();
  const dispatch = useDispatch();
  console.log(user, location);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Toaster
        toastOptions={{
          style: {
            padding: "20px",
            fontSize: "15px",
          },
        }}
      />
      <div className="container-fluid">
        <Link to="/">
            <img height="61" width="196" src="/img/logo.png" alt="" />
        </Link>

        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {
            location.pathname !== "/dashboard" && (
              <>
                <li className="nav-item">
                  <NavLink 
                    to="/"
                    className={({ isActive }) => 
                      (isActive ? "nav-link active" : "nav-link")}
                  >
                    Home
                  </NavLink>
                </li>
                {
                  isUser && (
                    <li className="nav-item">
                    <NavLink 
                      to="/dashboard"
                      className={({ isActive }) => 
                        (isActive ? "nav-link active" : "nav-link")}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  )
                }

                <li className="nav-item">
                  <NavLink 
                    to="/about-us"
                    className={({ isActive }) => 
                      (isActive ? "nav-link active" : "nav-link")} 
                  >
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    to="/contact-us"
                    className={({ isActive }) => 
                      (isActive ? "nav-link active" : "nav-link")} 
                    >
                    Contact Us
                  </NavLink>
                </li>
              </>
              )
            } 
            </ul>
        
          {
            isUser && location.pathname === "/dashboard" && (
              <div className="user-btn d-flex align-items-center">
                  <Link className="nav-link" to="/update-profile">
                      {" "}
                      <h4 id="profile-name" className="sub-heading me-1 ">
                        { __u__?.info?.firstName +
                          " " +
                        __u__?.info?.lastName }
                      </h4>
                  </Link>
                  <img height="62" width="62" src="/img/user.png" alt="" />
              </div>
            )
          }
          { location.pathname !== "/dashboard" && (
            <>{ isUser? (
              <div className="navbar-btn">
              <Link onClick={()=>{
                dispatch(logOut())
              }} to="#">
                Log out
              </Link>
            </div>
            ): (
              <div className="navbar-btn">
              <Link to="/sign-in">
                Sign In / Sign Up
              </Link>
            </div>
            )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
