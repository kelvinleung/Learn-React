/*
核心组件，处理游戏的主逻辑，储存游戏状态，管理其他组件的行为。
*/

import React from 'react'
import Board from './board'
// 将通用函数抽离，便于复用。
import { checkWinner } from '../utils'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      isNextX: true,
      moveNumber: 0
    };
  }
  handleClick(i) {
    // 对于数组，用深拷贝来处理元素的变更，详见：
    // https://reactjs.org/tutorial/tutorial.html#why-immutability-is-important
    const history = this.state.history.slice(0, this.state.moveNumber + 1);
    const current = history[this.state.moveNumber];
    const squares = current.squares.slice();
    // 当一个格不为空时，或某一游戏方已经胜利时，没法再点击，直接 return 忽略后面的语句。
    if (squares[i] || checkWinner(squares)) return;
    squares[i] = this.state.isNextX ? 'X' : 'O';
    this.setState({
      history: history.concat([{squares: squares}]),
      isNextX: !this.state.isNextX,
      moveNumber: history.length
    });
  }
  jumpTo(move) {
    this.setState({
      // 根据当前的步数来判断是 X 还是 O
      isNextX: move % 2 === 0,
      moveNumber: move
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.moveNumber];
    const winner = checkWinner(current.squares);
    const status = winner ? ('Winner: ' + winner) : ('Next player: ' + (this.state.isNextX ? 'X' : 'O'));
    // 定义一个 JSX 元素数组来布局历史数据，不像 Vue 可以用 v-for
    const moves = history.map((v, move) => {
      const desc = move? ('Go to #' + move) : 'Go to start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    /*
    关于 onClick 的传值问题，要传函数，不能直接传语句，语句会马上执行，如 this.handleClick(i)，就会马上调用该函数。
    这里传递给 Board 组件的 (i) => this.handleClick(i) 箭头函数相当于匿名，为方便，给这个箭头函数命名为 firstHandler，传到 Board 后，Board 的 props.onClick 其实就是 firstHandler 了。
    而在 Board 组件中，通过另一匿名函数 () => this.props.onClick(index)，暂命名为 secondHandler 传递给 Square 组件，则 Square 中的 props.onClick 就是 secondHandler，且在 Board 中，this.props.onClick(index) 调用时带上了参数 index，因为只有在 Board 中才能知道是哪个 Square 被点击了。
    所以整个调用是这样的，当 Square 实例被点击时，会调用它的 props.onClick，也就是 Board 中的 secondHandler，即 () => this.props.onClick(index)，而这个 props.onClick 实际上就是 Game 中传过去的 firstHandler，即 (i) => this.handleClick(i)，因此最终调用的就是  Game 组件中的 handleClick(index) 这个函数，参数就是 Board 中对应的 index。
    */
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game
