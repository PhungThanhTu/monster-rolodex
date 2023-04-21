import './App.css';
import { Component } from 'react';

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
      },
      () => {
        console.log(this.state)
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
        <input 
        className='search-box'
        type='search'
        placeholder='search monster'
        onChange={onSearchChange}
        />
        {
          filteredMonster.map((monster) => (
            <h1 key={monster.name}>{monster.name}</h1>
          ))
        }
      </div>
    );
  }
}

export default App;
