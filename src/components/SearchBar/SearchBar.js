import React from 'react';
import './SearchBar.css';
import arrow from '../../images/arrow.svg';

function SearchBar({ onSubmit, value, handleSetValue }) {
  // const [value, setValue] = useState('');

  const handleChange = (evt) => {
    handleSetValue(evt.target.value);
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(value);
    handleSetValue('');
  }

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
    >
      <input
        className="search-bar__input"
        onChange={handleChange}
        value={value || ''}
        type="text"
        name="search"
        id="search-bar-input"
        placeholder="Что ищем?"
        required
      />
      <button
        className="search-bar__button"
        type="submit"
      >
        <img
          className="search-bar__arrow"
          src={arrow}
          alt="Стрелка"
        />
        ИСКАТЬ
      </button>
    </form>
  );
}

export default SearchBar;
