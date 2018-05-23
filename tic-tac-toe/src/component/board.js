/*
面板组件，主要用于布局用于游戏的格子，传递格子的不同状态。
*/

import React from 'react'
import Square from './square'

class Board extends React.Component {
  renderSquare(squares) {
    // 3 x 3 的面板，需要通过二维数组构建。
    let rows = [];
    for (let i = 0; i < 3; i++) {
      let cols = [];
      for (let j = 0; j < 3; j++) {
        // 确定每一个 Square 的编号，一维化填充数据。
        const index = j + i * 3;
        cols.push(
          <Square
            key={j}
            value={squares[index]}
            onClick={() => this.props.onClick(index)}
          />
        )
      }
      rows.push(
        <div key={i} className="board-row">
          {cols}
        </div>
      );
    }
    return rows;
  }
  render() {
    const squares = this.props.squares
    return this.renderSquare(squares);
  }
}

export default Board
