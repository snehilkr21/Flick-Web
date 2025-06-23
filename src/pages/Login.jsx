import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState("Snehil@gmail.com");
  const [password, setPassword] = useState("Snehil@123");

  async function onSubmit() {
    try {
      const data = await axios.post(
        `${BASE_URL}/login`,
        {
          password: "Snehil@123",
          emailId: "Snehil@gmail.com",
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(data?.data?.data));
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h1 className="card-title flex justify-center">Login</h1>
          <div className="my-2">
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
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                onSubmit();
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
