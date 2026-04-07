import React from 'react';
import styles from './AttributeCard.module.css';

const AttributeCard = ({ title, icon, tags, placeholder, variant = 'default', onAddTag, onRemoveTag }) => {
  const [inputValue, setInputValue] = React.useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  const handleAddClick = () => {
    if (inputValue.trim()) {
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>{title}</h3>
          <span className={`material-symbols-outlined ${styles.icon}`}>
            {icon}
          </span>
        </div>
      </div>
      
      <div className={styles.tagContainer}>
        {tags.map((tag, index) => {
          let tagClass = styles.tag;
          if (variant === 'secondary') tagClass = `${styles.tag} ${styles.tagSecondary}`;
          if (variant === 'primary') tagClass = `${styles.tag} ${styles.tagPrimary}`;
          if (tag.color) tagClass = `${styles.tag} ${styles.tagWithColor}`;

          return (
            <span key={index} className={tagClass}>
              {tag.color && (
                <span 
                  className={styles.colorDot} 
                  style={{ backgroundColor: tag.color }}
                ></span>
              )}
              {tag.label}
              <span 
                className={`material-symbols-outlined ${styles.removeIcon}`}
                onClick={() => onRemoveTag(index)}
              >
                close
              </span>
            </span>
          );
        })}
      </div>
      
      <div className={styles.inputWrapper}>
        <input 
          type="text" 
          className={styles.input} 
          placeholder={placeholder || "Add value..."}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className={styles.addBtn} onClick={handleAddClick}>
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
};

export default AttributeCard;
