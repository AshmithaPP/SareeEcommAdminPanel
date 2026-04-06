import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '', ...props }) => {
  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${className}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
