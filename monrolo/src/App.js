import './App.css';
import { useEffect, useState } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => { 

  const [searchFieldValue, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonster, setFilteredMonster] = useState([]);
  const [title, setTitle] = useState('');

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

  const onTitleChange = (event) => {
    const titleString = event
    .target
    .value
    .toLowerCase();

    setTitle(titleString);
  }

  return (
    <div className="App">
      <h1 className='app-title'>{title}</h1>
      <SearchBox 
        className='monsters-search-box'
        onChangeHandler={onSearchChange}
        placeholder='Search monster'
      />
      <br/>
      <SearchBox 
        className='title-search-box'
        onChangeHandler={onTitleChange}
        placeholder='set title'
      />
      <CardList 
        monsters={filteredMonster}
        anything={['a','z']}
      />
    </div>
  );
}

export default App;
