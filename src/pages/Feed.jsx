import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../component/userCard";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  async function getFeed() {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (!feed) getFeed();
  }, []);
  if (feed?.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;
  return (
    <div className="flex justify-center my-10">
      {feed?.length > 0 && <UserCard user={feed[0]} />};
    </div>
  );
}
export default Feed;
