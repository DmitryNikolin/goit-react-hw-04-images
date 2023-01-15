import { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';

import styles from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleChange = event =>
    setName(event.currentTarget.value.toLowerCase());

  const handleSubmit = event => {
    event.preventDefault();

    if (name.trim() === '') {
      Notiflix.Notify.failure('Please enter a valid name to search');
    }

    onSubmit(name);
    setName('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 20 20"
            >
              <title>search</title>
              <path d="M19 17l-5.15-5.15a7 7 0 1 0-2 2L17 19zM3.5 8A4.5 4.5 0 1 1 8 12.5 4.5 4.5 0 0 1 3.5 8z" />
            </svg>
          </span>
        </button>

        <input
          value={name}
          className={styles.SearchFormInput}
          type="text"
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
