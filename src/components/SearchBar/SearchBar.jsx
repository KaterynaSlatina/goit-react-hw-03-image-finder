import React from 'react';
import { Component } from 'react';
import css from './SearchBar.module.css';

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

    this.props.onSubmit(this.state.inputData);
    console.log(this.state);
    this.setState({ inputData: '' });
  };

  render() {
    return (
      <header className={css.search}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button className={css.searchBtn} type="submit">
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
            className={css.input}
          />
        </form>
      </header>
    );
  }
}
export default SearchBar;
