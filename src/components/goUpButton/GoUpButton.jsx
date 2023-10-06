import React, { useEffect, useState } from "react";

import "./GoUpButton.scss";

const GoUpButton = (props) => {
  const { showButtonAtHeight } = props;

  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > showButtonAtHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  const goUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={
        showButton ? "go-up-button go-up-button--active" : "go-up-button"
      }
      onClick={goUp}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='24'
        viewBox='0 -960 960 960'
        width='24'
      >
        <path d='M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z' />
      </svg>
    </div>
  );
};

export default GoUpButton;
