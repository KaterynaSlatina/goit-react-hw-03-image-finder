import React from 'react';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GetAllImages } from '../FetchApi/GetAllImages';

export class ImageGallery extends Component {
  state = {
    hits: null,
    isLoading: false,
    error: '',
  };

  componentDidMount() {
    this.getImages();
  }

  getImages = async () => {
    try {
      this.setState({ isLoading: true, error: '' });
      const response = await GetAllImages();
      this.setState({ hits: response.hits });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { hits, isLoading, error } = this.state;
    return (
      <>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {hits && hits.map(el => <ImageGalleryItem key={el.id} hit={el} />)}
      </>
    );
  }
}
