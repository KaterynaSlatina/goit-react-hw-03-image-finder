import React, { Component } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    inputData: '',
    items: [],
  };

  formSubmit = data => {
    console.log(data);
  };

  render() {
    return (
      <>
        <SearchBar onSubmit={this.formSubmit} />
        <ImageGallery />
      </>
    );
  }
}
