/*
将组件从 index.js 文件中抽离，保持组件独立，便于维护。
*/

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Game from './component/game'

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
