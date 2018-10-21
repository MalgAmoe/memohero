import React, { Component } from 'react';
import md5 from 'blueimp-md5';
import './App.css';

const baseURL = 'https://gateway.marvel.com:443/v1/public/';
const privateKey = 'e8b65f84acf29444acbc923a006b9c4963bfb1f6';
const publicKey = '59a89e925adfc0807da3394a4528b889';

class App extends Component {
  componentDidMount() {
    this.getHeroes()
  }
  getHeroes() {
    const ts = Date.now();
    const stringToHash = ts + privateKey + publicKey;
    const hash = md5(stringToHash);

    return fetch(`${baseURL}characters?limit=50&ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      .then(data => {
        console.log('data', data)
        return data.json()
      })
  }

  render() {
    return (
      <div className="App">
      Heroes!
      </div>
    );
  }
}

export default App;
