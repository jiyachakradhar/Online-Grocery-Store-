import React, { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCheckUserQuery } from "../../store/slice/userSlice";
import { login } from "../../store/feature/user";

const Start = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const { data, isLoading, error } = useCheckUserQuery();

  useEffect(() => {
    if (data && data.data.length > 0 && !error) {
      dispatch(login());
    }
  }, [data, error, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default Start;
