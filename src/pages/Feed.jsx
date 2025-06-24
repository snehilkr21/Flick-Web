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
    getFeed();
  }, []);
  console.log("feed", feed);
  if (Array.isArray(feed) && feed.length === 0) return null;
  return (
    <div className="flex justify-center my-10">
      {feed?.length &&
        feed.map((specificUser) => {
          return <UserCard user={specificUser} key={specificUser._id} />;
        })}
    </div>
  );
}
export default Feed;
