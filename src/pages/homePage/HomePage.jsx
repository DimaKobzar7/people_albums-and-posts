import React, { useEffect, useState } from "react";
import UsersList from "../../components/userList/UsersList";

import fetchData from "../../api";
import UsersFilter from "../../components/userFilter/UsersFilter";

import "./HomePage.scss";
import { useLocation, useSearchParams } from "react-router-dom";
import GoUpButton from "../../components/goUpButton/GoUpButton";

const HomePage = () => {
  const [allUsers, setAllUsers] = useState([]);

  const [searchName, setSearchName] = useState(
    sessionStorage.getItem("lastSearchRequest") ?? ""
  );

  const [usersBySearch, setUsersBySearch] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const location = useLocation();

  const showButtonAtHeight = 700;

  useEffect(() => {
    document.title = "Home page";

    const body = document.querySelector("body");

    if (
      location.pathname === "/" &&
      !body.classList.contains("overflow-hidden")
    ) {
      body.classList.add("overflow-hidden");
    }

    if (!allUsers.length) {
      fetchData(
        process.env.REACT_APP_USERS,
        "",
        "",
        setAllUsers,
        setUsersBySearch
      );
    }

    return () => {
      if (body.classList.contains("overflow-hidden")) {
        body.classList.remove("overflow-hidden");
      }
    };
  }, []);

  const sortUsers = (arr) => {
    const sortedUsers = [...arr].sort((obj1, obj2) => {
      return obj1.username.localeCompare(obj2.username);
    });

    if (searchParams.get("sort") === "A-Z") {
      setAllUsers(sortedUsers);
    } else if (searchParams.get("sort") === "Z-A") {
      setAllUsers(sortedUsers.reverse());
    } else {
      setAllUsers(arr);
    }
  };

  useEffect(() => {
    if (usersBySearch) {
      const filter = usersBySearch.filter((user) => {
        if (user.username.toLowerCase().includes(searchName.toLowerCase())) {
          return user;
        }
      });

      sortUsers(filter);
    }

    sessionStorage.setItem(
      "lastHomePageUrl",
      location.pathname + location.search
    );
  }, [searchName, location, usersBySearch]);

  return (
    <div className='home-page'>
      <div className='container'>
        <h1 className='home-page__title'>
          Select the user's posts&nbsp;or&nbsp;albums
        </h1>

        <UsersFilter setSearchName={setSearchName} searchName={searchName} />

        <div className='home-page__wrap'>
          {allUsers.map((user) => (
            <UsersList
              key={user.id}
              userName={user.username}
              userId={user.id}
            />
          ))}
        </div>
      </div>

      <GoUpButton showButtonAtHeight={showButtonAtHeight} />
    </div>
  );
};

export default HomePage;
