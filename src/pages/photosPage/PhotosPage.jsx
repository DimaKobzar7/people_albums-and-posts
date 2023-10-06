import React, { useEffect, Suspense } from "react";

import { Await, useLoaderData } from "react-router-dom";

import fetchData from "../../api";

import ReturnButton from "../../components/returnButton/ReturnButton";

import CopyUrlButton from "../../components/copyUrlButton/CopyUrlButton";

import GoUpButton from "../../components/goUpButton/GoUpButton";

import Loader from "../../components/loader/Loader";

import "./PhotosPage.scss";

const PhotosPage = () => {
  const { photos } = useLoaderData();

  const showButtonAtHeight = 700;

  useEffect(() => {
    document.title = "Photos page";
  }, []);
  return (
    <div className='photos-page'>
      <div className='container'>
        <h1 className='photos-page__title'>Photos Page</h1>
        <div className='photos-page__buttons'>
          <ReturnButton
            text='Go to home page'
            path={sessionStorage.getItem("lastHomePageUrl")}
            homePage={true}
          />
          <ReturnButton text='Go back' />
          <CopyUrlButton />
        </div>
        <div className='photos-page__wrap'>
          <Suspense
            fallback={
              <>
                <Loader />
              </>
            }
          >
            <Await resolve={photos}>
              {(resolvedPhotos) => (
                <>
                  {resolvedPhotos.map((photoContent) => (
                    <div
                      className='photos-page__photo-content'
                      key={photoContent.id}
                    >
                      <h3 className='photos-page__photo-content-title'>
                        {photoContent.title}
                      </h3>

                      <img
                        className='photos-page__img'
                        onError={(e) => {
                          e.target.onerror = null;
                          e.currentTarget.src =
                            "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png";
                        }}
                        src={
                          photoContent.thumbnailUrl ||
                          "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
                        }
                        alt={photoContent.title}
                      />
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

export const photosLoader = async ({ request, params }) => {
  const photos = fetchData(
    process.env.REACT_APP_ALBUMS,
    params.albumId,
    params.photos
  );

  return {
    photos,
  };
};

export default PhotosPage;
