import React from "react";

import { useParams } from "react-router-dom";

import ErrorPage from "../pages/errorPage/ErrorPage";

const RouteValidation = ({ children }) => {
  const params = useParams();

  const paramsArr = Object.entries(params);

  const routeId = paramsArr[0][1];
  const pathKey = paramsArr[1][0];
  const pathValue = paramsArr[1][1];

  const isNumber = /^\d+$/.test(routeId);

  if (isNumber && pathKey === pathValue) {
    return children;
  } else {
    return <ErrorPage />;
  }
};

export default RouteValidation;
