import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "../../views/main-page/main-page";
import ErrorPage from "../../views/error-page/error-page";
import ControlledForm from "../../views/controlled-form/controlled-form";
import UncontrolledForm from "../../views/uncontrolled-form/uncontrolled-form";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/main" element={<Main />} />
      <Route path="/" element={<Navigate replace to="/main" />} />
      <Route path="/controlled-form" element={<ControlledForm />} />
      <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
