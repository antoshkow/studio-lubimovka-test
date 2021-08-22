import React from 'react';
import './Result.css';

function Result({ result }) {
  return (
    <div className="result">
      <h1 className="result__text">
        {result}
      </h1>
    </div>
  );
}

export default Result;
