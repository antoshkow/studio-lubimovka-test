import React from 'react';
import './SideBar.css';

function SideBar({ letter, authors }) {
  return (
    <div className="side-bar">
      <h2 className="side-bar__title">
        {letter}
      </h2>
      <ul className="side-bar__authors">
        {
          authors.map(({ _id, author_lastName, author_firstName }) => {
            return (
              <li key={_id} className="side-bar__author">
                {`${author_lastName} ${author_firstName}`}
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default SideBar;
