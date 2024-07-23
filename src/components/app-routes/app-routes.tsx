import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "../../views/error-page/error-page";
import Main from "../../views/main/main-page";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Navigate replace to="/main" />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
