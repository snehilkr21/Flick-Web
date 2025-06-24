import { useEffect } from "react";

function Toast({ message, unSetTheState }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      unSetTheState();
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  });
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
}
export default Toast;
