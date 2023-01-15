import { useEffect } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

export const Modal = ({ largeImageURL, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        console.log(event.code);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <div onClick={handleBackdropClick} className={styles.Overlay}>
      <div className={styles.Modal}>
        <img src={largeImageURL} alt="" />
        <button className={styles.CloseBtn} onClick={handleBackdropClick}>
          ⛌
        </button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  handleBackdpropClick: PropTypes.func,
};
