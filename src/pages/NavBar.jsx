import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL, default_image_url } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router-dom";
function Navbar() {
  const userData = useSelector((store) => store.user.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function logout() {
    try {
      console.log("99");
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="navbar bg-base-200 px-4">
      {/* Left Section: Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Dev Flick
        </Link>
      </div>

      {/* Right Section: Search and Avatar - All in one flex row */}
      {userData && Object.keys(userData).length > 0 && (
        <div className="flex-none flex items-center gap-4">
          {/* Search */}
          <div>{userData.firstName && `Hello ${userData.firstName}`}</div>

          {/* Profile Photo Dropdown */}
          <div className="dropdown dropdown-end  mx-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {userData.photoUrl && (
                  <img
                    alt="User Avatar"
                    src={userData?.photoUrl || default_image_url}
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/request">Request</Link>
              </li>
              <li>
                <a
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
