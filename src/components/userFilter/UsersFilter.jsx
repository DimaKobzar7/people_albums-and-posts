import React, { useEffect, useRef } from "react";

import { useSearchParams } from "react-router-dom";

import "./UserFilter.scss";

const UsersFilter = (props) => {
  const { searchName, setSearchName } = props;

  const [searchParams, setSearchParams] = useSearchParams();

  const inputField = useRef(null);

  const fromAsort = () => {
    setSearchParams("sort=A-Z");
  };

  const fromZsort = () => {
    setSearchParams("sort=Z-A");
  };

  const restAllSorting = () => {
    setSearchParams("");
  };

  const getSearchName = (event) => {
    const searchRequest = event.target.value.trim();
    sessionStorage.setItem("lastSearchRequest", searchRequest);
    setSearchName(searchRequest);
  };

  useEffect(() => {
    const trackTouch = (e) => {
      if (
        inputField.current === document.activeElement &&
        e.target !== inputField.current
      ) {
        inputField.current.blur();
      }
    };

    window.addEventListener("touchstart", trackTouch);

    return () => {
      window.removeEventListener("touchstart", trackTouch);
    };
  }, []);

  return (
    <div className='user-filter'>
      <div className='user-filter__wrap'>
        <div className='user-filter__input-wrap'>
          <p className='user-filter__text'>Search by userName:</p>
          <div className='user-filter__input-inner'>
            <input
              ref={inputField}
              className='user-filter__input'
              type='text'
              placeholder='Enter username'
              value={searchName}
              onChange={(event) => getSearchName(event)}
            />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='24'
              viewBox='0 -960 960 960'
              width='24'
            >
              <path d='M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z' />
            </svg>
          </div>
        </div>

        <div className='user-filter__inner'>
          <button
            className={
              searchParams.get("sort") === "A-Z"
                ? "user-filter__button user-filter__button--active"
                : "user-filter__button"
            }
            type='button'
            onClick={fromAsort}
          >
            Sort from A&nbsp;to&nbsp;Z
          </button>
          <button
            className={
              searchParams.get("sort") === "Z-A"
                ? "user-filter__button user-filter__button--active"
                : "user-filter__button"
            }
            type='button'
            onClick={fromZsort}
          >
            Sort from Z&nbsp;to&nbsp;A
          </button>

          <button
            className='user-filter__button'
            type='button'
            onClick={restAllSorting}
          >
            Reset sorting
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersFilter;
