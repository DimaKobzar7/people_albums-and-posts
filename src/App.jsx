import React from "react";

import { RouterProvider, createHashRouter } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";

import ErrorPage from "./pages/errorPage/ErrorPage";
import AlbumPage, { albumsLoader } from "./pages/albums/AlbumPage";
import PostsPage, { postsLoader } from "./pages/posts/PostPage";
import PhotosPage, { photosLoader } from "./pages/photosPage/PhotosPage";
import RouteValidation from "./hoc/RouteValidation";

import "./styles/_globalStyles.scss";

const router = createHashRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "userAlbum/:userId/:albums",
    loader: albumsLoader,
    element: (
      <RouteValidation>
        <AlbumPage />
      </RouteValidation>
    ),
  },
  {
    path: "userPost/:userId/:posts",
    loader: postsLoader,
    element: (
      <RouteValidation>
        <PostsPage />
      </RouteValidation>
    ),
  },
  {
    path: "userPhoto/:albumId/:photos",
    loader: photosLoader,
    element: (
      <RouteValidation>
        <PhotosPage />
      </RouteValidation>
    ),
  },

  { path: "*", element: <ErrorPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
