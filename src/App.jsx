import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./pages/Body";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";
import Feed from "./pages/Feed";
import Connections from "./pages/Connections";
function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Feed />} />
            <Route path="login" element={<Login />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
