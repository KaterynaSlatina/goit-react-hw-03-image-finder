import React, { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { fetchImage } from 'components/FetchApi/FetchApi';

export class App extends Component {
  state = {
    inputData: '',
    items: [],
    page: 1,
    totalImages: 0,
    hits: null,
    isLoading: false,
    error: '',
    isShowMore: false,
  };

  formSubmit = inputData => {
    console.log(inputData);
    if (this.state.inputData !== inputData) {
      this.setState(
        { inputData, page: 1, items: [], totalImages: 0 },
        this.fetchImage
      );
    }
  };

  componentDidMount() {
    this.getImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isShowMore !== prevState.isShowMore &&
      this.state.isShowMore
    ) {
      this.getImages();
    }
    if (
      this.state.isShowMore !== prevState.isShowMore &&
      !this.state.isShowMore
    ) {
      this.setState({ hits: null });
    }
  }

  getImages = async () => {
    try {
      this.setState({ isLoading: true, error: '' });
      const response = await fetchImage(this.state.inputData, this.state.page);
      this.setState({ hits: response.hits });
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleClick = () => {
    this.setState(prev => ({ isShowMore: !prev.isShowMore }));
  };

  render() {
    const { hits, isLoading, error, isShowMore } = this.state;
    console.log(hits);
    return (
      <>
        <SearchBar onSubmit={this.formSubmit} />
        <ImageGallery items={this.state.items} />
        <button onClick={this.handleClick}>
          {isShowMore ? 'Hide images' : 'Show more'}
        </button>
        {isLoading && <h1>Loading...</h1>}
        {error && <h1>{error}</h1>}
        {isShowMore &&
          hits &&
          hits.map(el => <ImageGalleryItem key={el.id} hit={el} />)}
      </>
    );
  }
}
