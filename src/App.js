import React from "react";

import { Route, Routes } from "react-router-dom";

import Layout from "./layout/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Missing from "./route/Missing";
import Unauthorized from "./route/UnAuthorize";

const App = (props) => {
  return (
    <Routes>
      <Route exact path="login" element={<Login />} />
      <Route exact path="register" element={<Register />} />
      <Route exact path="unauthorized" element={<Unauthorized />} />
      <Route exact path="" element={<Layout></Layout>} />
      <Route path="*" element={<Missing />} />
    </Routes>
  );
};
export default App;
