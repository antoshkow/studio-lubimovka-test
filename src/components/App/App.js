import React, { useState, useEffect } from 'react';
import './App.css';
import Result from '../Result/Result';
import SearchBar from '../SearchBar/SearchBar';
import Book from '../Book/Book';
import SideBar from '../SideBar/SideBar';
import searchData from '../../utils/data.json';

function App() {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [booksData, setBooksData] = useState([]);
  const [authorsData, setAuthorsData] = useState([]);
  const [isResultOk, setIsResultOk] = useState(false);

  useEffect(() => {
    const booksData = searchData.result.filter((value) => {
      if (result === '') {
        return null;
      } else if (value.title.toLowerCase().includes(result.toLowerCase())) {
        return value;
      } else {
        return null;
      }
    })
      .sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);

    const authorsData = searchData.result.filter((value) => {
      if (result === '') {
        return null;
      } else if (value.author_lastName.toLowerCase().includes(result.toLowerCase())) {
        return value;
      } else {
        return null;
      }
    })
      .sort((a, b) =>
        a.author_lastName.toUpperCase() > b.author_lastName.toUpperCase() ? 1 : -1
      )
      .filter(({ author_lastName }, i, arr) =>
        arr.findIndex(e => author_lastName === e.author_lastName) === i
      )
      .reduce((acc, author) => {
        const firstLetter = author.author_lastName[0];
        if (!acc[firstLetter]) {
          acc[firstLetter] = {
            title: firstLetter,
            data: [author]
          }
        } else {
          acc[firstLetter].data.push(author);
        }
        return acc;
      }, {});

    setBooksData(booksData);
    setAuthorsData(authorsData);

    if (booksData.length === 0 && Object.keys(authorsData).length === 0) {
      setIsResultOk(false);
    } else {
      setIsResultOk(true);
    }
  }, [result]);

  const handleSearchClick = (value) => {
    setResult(value);
  }

  return (
    <div className="app">
      <Result
        result=
          {
            result === '' ? 'Поиск' : (
              isResultOk ? `По запросу «${result}» мы нашли` : `По запросу «${result}» мы ничего не нашли`
            )
          }
      />
      <SearchBar
        value={value}
        handleSetValue={setValue}
        onSubmit={handleSearchClick}/>
      <section className="app__result">
        <ul className="app__books">
          {
            booksData.map(({
              _id, title, author_firstName,
              author_lastName, city, year
            }) => {
              return (
                <Book
                  key={_id}
                  title={title}
                  author={`${author_firstName} ${author_lastName}`}
                  city={city}
                  year={year}
                />
              )
            })
          }
        </ul>
        <div className="app__sidebar">
          {
            Object.entries(authorsData).map((list) => {
              return (
                <SideBar
                  key={list[1].data.find(e => e._id)._id}
                  authors={list[1].data}
                  letter={list[0]}
                />
              )
            })
          }
        </div>
      </section>
    </div>
  );
}

export default App;
