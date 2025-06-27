import { BASE_URL, default_image_url } from "../utils/constant";
import { useDispatch } from "react-redux";
import axios from "axios";
import { removeFeed } from "../utils/feedSlice";
function UserCard({ user }) {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFeed = async (status, userId) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/send/${status}/${user._id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      // navigate("/error");
    }
  };
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={user?.photoUrl || default_image_url} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${user.firstName} ${user.lastName}`}</h2>
        <p>{user.about}</p>
        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => handleFeed("ignored", user?._id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleFeed("interested", user?._id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}
export default UserCard;
