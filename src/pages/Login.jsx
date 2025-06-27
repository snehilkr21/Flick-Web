import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { useMemo } from "react";
import { Link } from "react-router-dom";
function Login() {
  const location = useLocation();
  console.log("9", location.pathname);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  async function onSignUp() {
    try {
      const data = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName: firstName,
          lastName: lastName,
          password: password,
          emailId: emailId,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(data?.data?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.message || "something went wrong");
    }
  }
  async function onLogin() {
    try {
      const data = await axios.post(
        `${BASE_URL}/login`,
        {
          password: password,
          emailId: emailId,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(data?.data?.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "something went wrong");
    }
  }
  const showLoginPage = useMemo(() => {
    if (location.pathname == "/login") return true;
    return false;
  }, [location]);
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h1 className="card-title flex justify-center">
            {!showLoginPage ? "SignUp" : "Login"}
          </h1>
          <div className="my-2">
            {!showLoginPage && (
              <>
                <fieldset className="fieldset py-2">
                  <legend className="fieldset-legend">FirstName</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset py-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset py-2">
              <legend className="fieldset-legend">Email Id</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset ">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </fieldset>
          </div>
          <div className="text-red-400">{error}</div>
          <div className="card-actions justify-center">
            {!showLoginPage ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  onSignUp();
                }}
              >
                SignUp
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  onLogin();
                }}
              >
                Login
              </button>
            )}
          </div>
          <p className=" justify-center underline cursor-pointer mx-auto">
            {showLoginPage ? (
              <Link to="/signUp">New user? SignUp</Link>
            ) : (
              <Link to="/login">Already registered ? Login</Link>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Login;
