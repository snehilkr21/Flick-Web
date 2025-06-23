import { useSelector } from "react-redux";

function Navbar() {
  const userData = useSelector((store) => store.user.data);
  return (
    <div className="navbar bg-base-200 px-4">
      {/* Left Section: Logo */}
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Dev Flick</a>
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
                  <img alt="User Avatar" src={userData?.photoUrl} />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
