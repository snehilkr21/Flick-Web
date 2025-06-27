import axios from "axios";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
// import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { default_image_url } from "../utils/constant";
function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);
  const navigate = useNavigate();

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeRequest(id));
      }
    } catch (err) {
      //   navigate("/error");
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/requests/received`, {
          withCredentials: true,
        });

        dispatch(addRequests(res.data.data));
      } catch {
        navigate("/error");
      }
    };
    fetchRequests();
  }, [dispatch, navigate]);

  //   if (!requests) {
  //     return <Loader />;
  //   }
  if (requests?.length == 0 || !requests) {
    return (
      <h1 className="text-3xl my-10 flex justify-center font-bold">
        No requests found!
      </h1>
    );
  }
  const filteredData = requests?.filter(
    (request) => request.fromUserId !== null
  );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {Array.isArray(filteredData) &&
        filteredData?.length > 0 &&
        filteredData // Filter out null fromUserId
          ?.map((request) => {
            const { _id, firstName, lastName, photoURL, age, gender, about } =
              request.fromUserId;

            return (
              <div
                key={_id}
                className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300  mx-auto  md:w-1/2"
              >
                <div>
                  <img
                    alt="photo"
                    className="md:w-36 md:h-28 md:rounded-full"
                    src={photoURL || default_image_url}
                  />
                </div>
                <div className="text-left mx-4">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <p className="text-sm md:text-xl">{about}</p>
                </div>
                <div className="md:flex ">
                  <button
                    className="btn btn-primary mx-2"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary mx-2"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default Requests;
