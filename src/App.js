import React, {Component} from 'react';
import Game from './components/Game';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1 className="App-title">Welcome to Game of Life</h1>
                <Game />
                <footer className="App-footer">
                </footer>
            </div>
        );
    }
}

export default App;
