import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { nanoid } from 'nanoid';

export const ImageGallery = ({ items, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {items.map(item => (
        <ImageGalleryItem
          key={nanoid()}
          hit={item}
          onImageClick={onImageClick}
        />
      ))}
    </ul>
  );
};
