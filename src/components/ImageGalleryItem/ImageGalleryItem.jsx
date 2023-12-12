import React from 'react';

export const ImageGalleryItem = ({ hit }) => {
  return (
    <li>
      <img src={hit.webformatURL} alt="" />
    </li>
  );
};
