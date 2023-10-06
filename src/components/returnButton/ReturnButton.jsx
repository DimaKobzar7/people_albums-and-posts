import React from "react";

import { Link, useNavigate } from "react-router-dom";

import "./ReturnButton.scss";

const ReturnButton = (props) => {
  const { text, path, homePage } = props;

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <button className='return-button'>
      {homePage ? (
        <Link className='return-button__link' to={path}>
          {text}
        </Link>
      ) : (
        <p className='return-button__link' onClick={goBack}>
          {text}
        </p>
      )}
    </button>
  );
};

export default ReturnButton;
