import { default_image_url } from "../utils/constant";

function UserCard({ user }) {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={user?.photoUrl || default_image_url} alt="Photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${user.firstName} ${user.lastName}`}</h2>
        <p>{user.about}</p>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
}
export default UserCard;
