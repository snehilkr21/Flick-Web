import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import Footer from "./Footer";
import Navbar from "./Navbar";

function Body() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user.data);

  async function fetchUser() {
    try {
      const userProfile = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(userProfile?.data));
    } catch (err) {
      if (err.status === 401) navigate("/login");
      console.log("err ", err);
    }
  }
  useEffect(() => {
    if (
      !(userData && Object.keys(userData).length > 0) &&
      location.pathname !== "/login"
    ) {
      fetchUser();
    }
  }, [navigate]);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Body;
