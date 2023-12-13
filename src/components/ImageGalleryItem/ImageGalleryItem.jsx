import React from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ hit, onImageClick }) => {
  const click = () => {
    onImageClick(hit.webformatURL);
  };
  return (
    <li className={css.imageItem}>
      <img src={hit.webformatURL} alt="" onClick={click} />
    </li>
  );
};
