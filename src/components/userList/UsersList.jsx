import React from "react";

import { Link } from "react-router-dom";
import "./UserList.scss";

const UsersList = (props) => {
  const { userName, userId } = props;

  return (
    <div className='user'>
      <p className='user__name'>{userName}</p>
      <div className='user__wrap'>
        <button type='button' className='user__button'>
          <Link className='user__link' to={`/userAlbum/${userId}/albums`}>
            Albums
          </Link>
        </button>
        <button type='button' className='user__button'>
          <Link className='user__link' to={`/userPost/${userId}/posts`}>
            Posts
          </Link>
        </button>
      </div>
    </div>
  );
};

export default UsersList;
