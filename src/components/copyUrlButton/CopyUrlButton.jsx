import React, { useState } from "react";

import "./CopyUrlButton.scss";

const CopyUrlButton = () => {
  const [copiedUrl, secCopiedUrl] = useState(false);

  const copyUrl = () => {
    secCopiedUrl(true);
    navigator.clipboard.writeText(window.location.href);

    setTimeout(() => {
      secCopiedUrl(false);
    }, 2000);
  };

  return (
    <button type='button' className='copy-url-button' onClick={copyUrl}>
      <p className='copy-url-button__text'>Copy page URL</p>
      <p
        className={
          copiedUrl
            ? "copy-url-button__label copy-url-button__label--active"
            : "copy-url-button__label"
        }
      >
        URL copied
      </p>
    </button>
  );
};

export default CopyUrlButton;
