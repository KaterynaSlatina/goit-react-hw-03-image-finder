import React from 'react';
import { Component } from 'react';

export class SearchBar extends Component {
  state = {
    inputData: '',
  };

  onChangeInput = e => {
    this.setState({ inputData: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { inputData } = this.state;

    if (inputData === '') {
      alert('Please, fill input');
      return;
    }

    this.props.onSubmit(this.setState.inputData);
    console.log(this.state);
    this.setState({ inputData: '' });
  };

  render() {
    return (
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            name="inputData"
            value={this.state.inputData}
            onChange={this.onChangeInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default SearchBar;
