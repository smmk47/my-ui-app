// src/components/CheckboxListItem/CheckboxListItem.jsx
import React from 'react';
import styles from './CheckboxListItem.module.css';

const CheckboxListItem = ({ label, checked, onChange, id }) => {
  return (
    <label htmlFor={id} className={styles.listItem}>
      <span>{label}</span>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
      />
    </label>
  );
};

export default CheckboxListItem;