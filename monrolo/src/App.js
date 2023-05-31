import './App.css';
import { Component, useEffect, useState } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => { 

  const [searchFieldValue, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonster, setFilteredMonster] = useState([]);

  useEffect(
    () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(
    () => {
      const newFilteredMonster = monsters.filter(
        (monster) => monster.name.toLocaleLowerCase().includes(searchFieldValue)
      );

      setFilteredMonster(newFilteredMonster);
    }, [searchFieldValue, monsters]);

  const onSearchChange = (event) => {
    const searchFieldString = event
    .target
    .value
    .toLowerCase();

    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
      <h1 className='app-title'> Monster Rolodex</h1>
      <SearchBox 
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='Search monster'
      />
      <CardList 
        monsters={filteredMonster}
        anything={['a','z']}
      />
    </div>
  );
}

export default App;
