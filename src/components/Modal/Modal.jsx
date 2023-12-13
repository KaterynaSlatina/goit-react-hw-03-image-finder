import React, { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  handleEsc = e => {
    if (e.code === 'Escape') this.props.onCloseModal();
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  handleImageClick = e => {
    e.stopPropagation();
  };
  render() {
    const { item, onCloseModal } = this.props;
    return (
      <div className={css.overlay} onClick={onCloseModal}>
        <div>
          <img src={item} alt="" onClick={this.handleImageClick} />
        </div>
      </div>
    );
  }
}
