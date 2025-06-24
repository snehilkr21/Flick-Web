import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import Toast from "../component/toast";

function Profile() {
  const userData = useSelector((store) => store.user.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(userData?.photoUrl || "");
  const [age, setAge] = useState(userData?.age || "");
  const [gender, setGender] = useState(userData?.gender || "");
  const [about, setAbout] = useState(userData?.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  async function onSave() {
    setError("");
    try {
      const data = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(data?.data?.data));
      setShowToast(true);
    } catch (err) {
      setError(err?.response?.data?.message || "something went wrong");
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h1 className="card-title flex justify-center">Profile</h1>
          <div className="my-2">
            <fieldset className="fieldset py-2">
              <legend className="fieldset-legend">First Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset py-2">
              <legend className="fieldset-legend">last Name</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset py-2">
              <legend className="fieldset-legend">Profile URL</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset py-2">
              <legend className="fieldset-legend">Age</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset py-2">
              <legend className="fieldset-legend">Gender</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset py-2">
              <legend className="fieldset-legend">About</legend>
              <input
                type="text"
                className="input"
                placeholder="Type here"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="text-red-400">{error}</div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => {
                onSave();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      {showToast && (
        <Toast
          message={"Profile Updated"}
          unSetTheState={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
export default Profile;
