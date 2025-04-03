// src/components/Button/Button.jsx
import React from 'react';
import styles from './Button.module.css';

const Button = ({ children = 'Done', onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log('Button clicked');
    }
  };

  return (
    <button className={styles.button} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;