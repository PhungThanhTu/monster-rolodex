import './App.css';
import { Component } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor(){
    super();

    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  onSearchChange = (e) => {
    const searchField = e
      .target
      .value
      .toLocaleLowerCase();

    this.setState(() => {
      return {
        searchField
      }
    })
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState(() => {
        return { monsters: users}
      }
      ));
  }

  render(){

    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonster = monsters
          .filter((monster) => {
            return monster
              .name
              .toLocaleLowerCase()
              .includes(searchField);
          });
    
    
    return (
      <div className="App">
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
}

export default App;
