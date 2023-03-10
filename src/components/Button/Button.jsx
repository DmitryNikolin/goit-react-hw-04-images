import PropTypes from 'prop-types';

import styles from './Button.module.css';

function Button({ onButtonClick }) {
  return (
    <div className={styles.BtnContainer}>
      <button className={styles.Button} type="button" onClick={onButtonClick}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onButtonClick: PropTypes.func,
};

export default Button;
