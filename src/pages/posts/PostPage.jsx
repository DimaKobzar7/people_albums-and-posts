import React, { Suspense, useEffect } from "react";

import { Await, useLoaderData, useLocation } from "react-router-dom";

import fetchData from "../../api";
import ReturnButton from "../../components/returnButton/ReturnButton";
import CopyUrlButton from "../../components/copyUrlButton/CopyUrlButton";

import GoUpButton from "../../components/goUpButton/GoUpButton";
import Loader from "../../components/loader/Loader";

import "./PostPage.scss";

const PostsPage = () => {
  const { posts } = useLoaderData();

  const showButtonAtHeight = 700;

  useEffect(() => {
    document.title = "Post page";
  }, []);
  return (
    <div className='post-page'>
      <div className='container'>
        <h1 className='post-page__title'>Posts Page</h1>
        <div className='post-page__buttons'>
          <ReturnButton
            text='Go to home page'
            path={sessionStorage.getItem("lastHomePageUrl")}
            homePage={true}
          />
          <ReturnButton text='Go back' />
          <CopyUrlButton />
        </div>

        <div className='post-page__wrap'>
          <Suspense
            fallback={
              <>
                <Loader />
              </>
            }
          >
            <Await resolve={posts}>
              {(resolvedPosts) => (
                <>
                  {resolvedPosts.map((post, index) => (
                    <div className='post-page__post' key={post.id}>
                      <h3 className='post-page__post-title'>
                        Post № {index + 1}
                      </h3>
                      <h3 className='post-page__post-title'>{post.title}</h3>
                      <p className='post-page__post-content'>{post.body}</p>
                    </div>
                  ))}
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
      <GoUpButton showButtonAtHeight={showButtonAtHeight} />
    </div>
  );
};

export const postsLoader = async ({ request, params }) => {
  const posts = fetchData(
    process.env.REACT_APP_USERS,
    params.userId,
    params.posts
  );

  return {
    posts,
  };
};

export default PostsPage;
