import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchFilter.module.css';

const SearchFilter = () => {
  return (
    <div className={styles.filterSection}>
      <div className={styles.searchWrapper}>
        <Search size={18} className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Search product catalogue..." 
          className={styles.searchInput}
        />
      </div>
    </div>
  );
};

export default SearchFilter;
