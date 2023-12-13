import React, { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
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
    if (!this.state.inputData) {
      return;
    }
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
    this.setState(prev => ({ page: prev.page + 1 }), this.getImages);
  };

  handleImageClick = imageUrl => {
    this.setState({ modalImage: imageUrl, isShowModal: true });
  };
  handleCloseModal = () => {
    this.setState({ isShowModal: false, modalImage: '' });
  };

  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  render() {
    const { hits, isLoading, error, isShowMore, isShowModal, modalImage } =
      this.state;
    console.log(hits);
    return (
      <>
        <SearchBar onSubmit={this.formSubmit} />
        <ImageGallery
          items={this.state.items}
          onImageClick={this.handleImageClick}
        />

        {isLoading && <Loader />}
        {error && <h1>{error}</h1>}
        {hits &&
          hits.map(el => (
            <ImageGalleryItem
              key={el.id}
              hit={el}
              onImageClick={this.handleImageClick}
            />
          ))}
        <Button onClick={this.handleClick}>
          {isShowMore ? 'Hide images' : 'Show more'}
        </Button>
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
