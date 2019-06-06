import React from 'react';
import './App.css';
import TicTacToe from 'tictactoe_model';

class Square extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()} >
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new TicTacToe()
    };
  }

  // X,Y are the square co-ordinates in the 2D array.
  handleClick(x, y) {
    let game = this.state.game;
    game.move(x, y);
    this.setState({ game: game });
  }

  reset() {
    let newGame = new TicTacToe();
    this.setState({ game: newGame });
  }

  // X,Y are the square co ordinates in the 2D array.
  renderSquare(x, y) {
    let value = this.state.game.value(x, y);
    // Note the call back "handleClick", that gets around the scope of the state.
    return <Square value={value} onClick={() => this.handleClick(x,y)} />;
  }

  renderBoard() {
    // Using a map in a map to travers the 2D array.
    // map returns a new map value.
    // Not the 2nd arg in map, is the index!
    return this.state.game.squares().map((rows, x) => {
      return <div className="board-row"> {
        rows.map((value, y) => this.renderSquare(x, y))
      } </div>;
    });
  }

  render() {
    let status = 'Next player: ' + this.state.game.turn();
    if (this.state.game.isDone()) {
      if (false !== this.state.game.winner()) {
        status = 'Winner: ' + this.state.game.winner();
      }
      else {
        status = 'Game has no winner.';
      }
    }
    return (
      <div>
        <div className="status">{status}</div>{this.renderBoard()}
        <button className="reset" onClick={() => this.reset() } >Reset</button>
      </div>
    );

  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (<div> <Game /> </div>);
  }
}

export default App;
