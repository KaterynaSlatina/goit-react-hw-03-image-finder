import React, { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImage } from 'FetchApi';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

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
    isShowModal: false,
    modalImage: '',
  };

  formSubmit = inputData => {
    console.log(inputData);
    if (this.state.inputData !== inputData) {
      this.setState(
        { inputData, page: 1, items: [], totalImages: 0 },
        this.getImages
      );
    }
  };

  componentDidMount() {
    this.getImages();
  }

  componentDidUpdate(prevProps, prevState) {
    const { inputData, page } = this.state;
    if (prevState.inputData !== inputData || prevState.page !== page) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { inputData, page } = this.state;
    if (!inputData) {
      return;
    }
    try {
      this.setState({ isLoading: true, error: '' });
      const response = await fetchImage(inputData, page);
      this.setState(prevState => ({
        items: prevState.items.concat(response.hits),
      }));
    } catch (error) {
      console.log(error);
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  //

  handleClick = () => {
    this.setState(prev => ({ page: prev.page + 1 }), this.getImages);
  };

  handleImageClick = imageUrl => {
    this.setState({ modalImage: imageUrl, isShowModal: true });
  };
  handleCloseModal = () => {
    this.setState({ isShowModal: false, modalImage: '' });
  };

  render() {
    const { items, isLoading, error, isShowMore, isShowModal, modalImage } =
      this.state;

    return (
      <>
        <SearchBar onSubmit={this.formSubmit} />
        <ImageGallery
          items={this.state.items}
          onImageClick={this.handleImageClick}
        />

        {isLoading && <Loader />}
        {error && <h1>{error}</h1>}
        {items.length > 0 && !isLoading && (
          <Button onClick={this.handleClick}>
            {isShowMore ? 'Hide images' : 'Show more'}
          </Button>
        )}
        {isShowModal && (
          <Modal
            isOpenModal={isShowModal}
            item={modalImage}
            onCloseModal={this.handleCloseModal}
          />
        )}
      </>
    );
  }
}
