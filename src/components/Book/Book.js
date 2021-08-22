import React from 'react';
import './Book.css';

function Book({ title, author, city, year }) {
  return (
    <li className="book">
      <div className="book__item">
        {title}
      </div>
      <h2 className="book__author">
        {author}
      </h2>
      <p className="book__city">
        {city}
      </p>
      <p className="book__city">
        {year}
      </p>
    </li>
  );
}

export default Book;
