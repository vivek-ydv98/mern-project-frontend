import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

export default function Logout({}) {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutAsync());
  });
  
  return <>{!loggedInUser && <Navigate to={"/"} replace={true}></Navigate>}</>;
}
