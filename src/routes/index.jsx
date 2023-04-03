import React from "react";
import { Routes, Route } from "react-router-dom";

import HasSettings from "../components/security";
import Machines from "../components/machines";
import PreAuthKey from "../components/preauth";
import Users from "../components/users";
import Login from "../components/login";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HasSettings />}>
        <Route path="/" element={<Machines />} />
        <Route path="/machines" element={<Machines />} />
        <Route path="/Users" element={<Users />} />
        <Route path="/preauthkey" element={<PreAuthKey />} />
      </Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default Navigation;
