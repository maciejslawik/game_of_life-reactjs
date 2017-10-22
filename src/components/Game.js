import React, {Component} from 'react';
import Tile from './Tile';

class Game extends Component {

    state = {
        board: [],
        iterationTime: 0,
        boardWidth: 50,
        boardHeight: 40,
        generations: 0,
        tileWidth: 12,
        tileHeight: 12,
        paused: true
    }

    constructor(props) {
        super(props);
        this.initBoard();
        this.gameIterate();
    }

    initBoard() {
        let board = [];
        for (let i = 0; i < this.state.boardHeight; i++) {
            board[i] = [];
            for (let j = 0; j < this.state.boardWidth; j++) {
                board[i][j] = {
                    width: this.state.tileWidth,
                    height: this.state.tileHeight,
                    alive: false,
                    x: j * this.state.tileWidth,
                    y: i * this.state.tileHeight
                };
            }
        }
        this.state.board = board;
    }

    randomizeBoard() {
        let board = this.state.board;
        for (let i = 0; i < this.state.boardHeight; i++) {
            for (let j = 0; j < this.state.boardWidth; j++) {
                board[i][j].alive = Math.random() >= 0.75;
            }
        }
        this.setState({board: board, generations: 0});
    }

    clearBoard() {
        let board = this.state.board;
        for (let i = 0; i < this.state.boardHeight; i++) {
            for (let j = 0; j < this.state.boardWidth; j++) {
                board[i][j].alive = false;
            }
        }
        this.setState({board: board, generations: 0});
    }

    gameIterate() {
        if (!this.state.paused) {
            this.calculateNewGeneration();
            this.setState({generations: this.state.generations + 1})
        }
        setTimeout(this.gameIterate.bind(this), this.state.iterationTime);
    }

    calculateNewGeneration() {
        let oldGen = [];
        for (let i = 0; i < this.state.boardHeight; i++) {
            oldGen[i] = [];
            for (let j = 0; j < this.state.boardWidth; j++) {
                oldGen[i][j] = this.state.board[i][j].alive;
            }
        }
        for (let i = 0; i < this.state.boardHeight; i++) {
            for (let j = 0; j < this.state.boardWidth; j++) {
                this.state.board[i][j].alive = this.calculateTileIsAlive(oldGen, i, j);
            }
        }
        this.setState({board: this.state.board});
    }

    calculateTileIsAlive(board, i, j) {
        let aliveNeighbours = 0;
        if (typeof board[i - 1] !== "undefined" && typeof board[i - 1][j - 1] !== "undefined") {
            aliveNeighbours = board[i - 1][j - 1] ? aliveNeighbours + 1 : aliveNeighbours;
        }
        if (typeof board[i - 1] !== "undefined" && typeof board[i - 1][j] !== "undefined") {
            aliveNeighbours = board[i - 1][j] ? aliveNeighbours + 1 : aliveNeighbours;
        }
        if (typeof board[i - 1] !== "undefined" && typeof board[i - 1][j + 1] !== "undefined") {
            aliveNeighbours = board[i - 1][j + 1] ? aliveNeighbours + 1 : aliveNeighbours;
        }
        if (typeof board[i] !== "undefined" && typeof board[i][j - 1] !== "undefined") {
            aliveNeighbours = board[i][j - 1] ? aliveNeighbours + 1 : aliveNeighbours;
        }
        if (typeof board[i] !== "undefined" && typeof board[i][j + 1] !== "undefined") {
            aliveNeighbours = board[i][j + 1] ? aliveNeighbours + 1 : aliveNeighbours;
        }
        if (typeof board[i + 1] !== "undefined" && typeof board[i + 1][j - 1] !== "undefined") {
            aliveNeighbours = board[i + 1][j - 1] ? aliveNeighbours + 1 : aliveNeighbours;
        }
        if (typeof board[i + 1] !== "undefined" && typeof board[i + 1][j] !== "undefined") {
            aliveNeighbours = board[i + 1][j] ? aliveNeighbours + 1 : aliveNeighbours;
        }
        if (typeof board[i + 1] !== "undefined" && typeof board[i + 1][j + 1] !== "undefined") {
            aliveNeighbours = board[i + 1][j + 1] ? aliveNeighbours + 1 : aliveNeighbours;
        }
        return aliveNeighbours === 3 || (board[i][j] && aliveNeighbours === 2);
    }

    togglePause() {
        this.setState({paused: !this.state.paused});
    }

    toggleTileState(e) {
        if (this.state.paused) {
            let i = e.target.getAttribute('i');
            let j = e.target.getAttribute('j');
            let newBoard = this.state.board;
            newBoard[i][j].alive = !newBoard[i][j].alive;
            this.setState({board: newBoard, generations: 0});
        }
    }

    getBoardHtml() {
        let board = [];
        for (let i = 0; i < this.state.boardHeight; i++) {
            for (let j = 0; j < this.state.boardWidth; j++) {
                board.push(this.getTileHtml(i, j));
            }
        }
        return board;
    }

    getTileHtml(i, j) {
        return <Tile
            key={i + '-' + j}
            width={this.state.board[i][j].width}
            height={this.state.board[i][j].height}
            alive={this.state.board[i][j].alive}
            x={this.state.board[i][j].x}
            y={this.state.board[i][j].y}
            i={i}
            j={j}
            click={this.toggleTileState.bind(this)}
        >
        </Tile>
    }

    render() {
        let tiles = this.getBoardHtml();
        return (
            <div className={"container-fluid"}>
                <div className={'row'}>
                    <h4 className="generations">
                        Generations: {this.state.generations}
                    </h4>
                </div>
                <div className={'row'}>
                    <div className={'col-xs-2 col-xs-offset-3'}>
                        <button
                            type="button"
                            onClick={this.togglePause.bind(this)}
                            className={'button btn-success btn btn-block'}
                        >
                            {this.state.paused ? 'Start' : 'Pause'}
                        </button>
                    </div>
                    <div className={'col-xs-2'}>
                        <button
                            type="button"
                            disabled={!this.state.paused}
                            onClick={this.randomizeBoard.bind(this)}
                            className={'button btn-default btn btn-block'}
                        >
                            Randomize
                        </button>
                    </div>
                    <div className={'col-xs-2'}>
                        <button
                            type="button"
                            disabled={!this.state.paused}
                            onClick={this.clearBoard.bind(this)}
                            className={'button btn-danger btn btn-block'}
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <svg width={this.state.boardWidth * this.state.tileWidth}
                     height={this.state.boardHeight * this.state.tileHeight}
                     className={'gameboard pagination-centered'}>
                    {tiles}
                </svg>
            </div>
        );
    }
}

export default Game;