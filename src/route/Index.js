import React, { Suspense, useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Homepage from "../pages/Homepage";
import RequireAuth from "./RequiredAuth";
import Unauthorized from "./UnAuthorize";
import Missing from "./Missing";
const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};
const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Routes>
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
export default Pages;
