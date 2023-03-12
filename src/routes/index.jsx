import React from "react";
import { Routes, Route } from "react-router-dom";

import HasSettings from "../components/security";
import Machines from "../components/machines";
import Login from "../components/login";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<HasSettings />}>
        <Route path="/" element={<Machines />} />
        <Route path="/machines" element={<Machines />} />
      </Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
};

export default Navigation;
