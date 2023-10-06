import React, { Suspense, useEffect } from "react";

import { Await, Link, useLoaderData } from "react-router-dom";

import fetchData from "../../api";
import ReturnButton from "../../components/returnButton/ReturnButton";
import CopyUrlButton from "../../components/copyUrlButton/CopyUrlButton";

import GoUpButton from "../../components/goUpButton/GoUpButton";
import Loader from "../../components/loader/Loader";

import "./AlbumPage.scss";

const AlbumsPage = () => {
  const { albums } = useLoaderData();

  const showButtonAtHeight = 700;

  useEffect(() => {
    document.title = "Album page";
  }, []);
  return (
    <div className='album-page'>
      <div className='container'>
        <h1 className='album-page__title'>Albums Page</h1>
        <div className='album-page__buttons'>
          <ReturnButton
            text='Go to home page'
            path={sessionStorage.getItem("lastHomePageUrl")}
            homePage={true}
          />
          <ReturnButton text='Go back' />
          <CopyUrlButton />
        </div>

        <div className='album-page__wrap'>
          <Suspense
            fallback={
              <>
                <Loader />
              </>
            }
          >
            <Await resolve={albums}>
              {(resolvedAlbums) => (
                <>
                  {resolvedAlbums.map((album, index) => (
                    <div className='album-page__album' key={album.id}>
                      <h3 className='album-page__album-title'>
                        Album № {index + 1}
                      </h3>
                      <p className='album-page__album-content'>{album.title}</p>

                      <button type='button' className='album-page__button'>
                        <Link
                          className='album-page__link'
                          to={`/userPhoto/${album.id}/photos`}
                        >
                          Look at photos
                        </Link>
                      </button>
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

export const albumsLoader = async ({ request, params }) => {
  const albums = fetchData(
    process.env.REACT_APP_USERS,
    params.userId,
    params.albums
  );

  return {
    albums,
  };
};

export default AlbumsPage;
