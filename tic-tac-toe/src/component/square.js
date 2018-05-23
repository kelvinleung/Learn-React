/*
方块组件，最基础的布局单元，便于复用。
*/

import React from 'react'

// 当组件仅仅只需要 render 的时候，可以定义成一个简单的返回 JSX 元素的函数，Functional Component。
function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >{props.value}</button>
  );
}

export default Square
