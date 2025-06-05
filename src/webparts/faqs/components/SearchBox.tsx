import * as React from 'react';
import styles from './SearchBox.module.scss';

export interface ISearchBoxProps {
  placeholder: string;
  onSearch: (query: string) => void;
}

export const SearchBox: React.FC<ISearchBoxProps> = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = (): void => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" fill="currentColor"/>
        </svg>
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
        />
        {searchTerm && (
          <button className={styles.clearButton} onClick={clearSearch} type="button">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 4.586L10.293.293a1 1 0 1 1 1.414 1.414L7.414 6l4.293 4.293a1 1 0 0 1-1.414 1.414L6 7.414l-4.293 4.293a1 1 0 0 1-1.414-1.414L4.586 6 .293 1.707A1 1 0 0 1 1.707.293L6 4.586z" fill="currentColor"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
