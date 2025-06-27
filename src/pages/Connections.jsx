import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { BASE_URL } from "../utils/constant";
import ConnectionCard from "../component/connectionCard";
function Connections() {
  const connectionData = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  async function findConnections() {
    const connectionUser = await axios.get(`${BASE_URL}/user/connections`, {
      withCredentials: true,
    });
    dispatch(addConnection(connectionUser?.data?.data));
  }
  useEffect(() => {
    if (!connectionData) findConnections();
  }, []);
  if (!connectionData) return;
  if (connectionData?.length == 0) return <h1>No Connection Found</h1>;
  return (
    <div className="my-10">
      <h1 className="text-3xl  text-center font-extrabold">Connections</h1>
      <div>
        {connectionData.map((user) => (
          <ConnectionCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
}
export default Connections;
