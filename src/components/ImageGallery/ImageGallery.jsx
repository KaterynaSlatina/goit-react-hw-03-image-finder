import React from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ items }) => {
  return (
    <ul>
      {items.map(item => {
        return <ImageGalleryItem key={item.id} item={item} />;
      })}
    </ul>
  );
};
