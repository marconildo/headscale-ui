import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const HasSettings = () => {
  let existsSettings = true;
  let headscaleURL = import.meta.env.VITE_HEADSCALE_URL;
  let headscaleAPIKey = import.meta.env.VITE_HEADSCALE_API_KEY;

  existsSettings =
    headscaleURL !== undefined &&
    headscaleURL !== "" &&
    headscaleAPIKey !== undefined &&
    headscaleAPIKey !== "";

  if (!existsSettings) {
    headscaleURL = localStorage.getItem("headscaleURL") || "";
    headscaleAPIKey = localStorage.getItem("headscaleAPIKey") || "";

    existsSettings = headscaleURL !== "" && headscaleAPIKey !== "";
  } else {
    localStorage.setItem("headscaleURL", headscaleURL);
    localStorage.setItem("headscaleAPIKey", headscaleAPIKey);
  }

  return existsSettings ? <Outlet /> : <Navigate to="/login" />;
};

export default HasSettings;
