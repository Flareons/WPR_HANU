import React from 'react';

function Square({ value }) {
  const squareStyle = {
    width: '49px',
    height: '49px',
    border: '1px solid black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    marginRight: '-1px',
    marginBottom: '-1px',
    boxSizing: 'border-box',
    backgroundColor: '#fff'
  };

  return (
    <div style={squareStyle}>
      {value}
    </div>
  );
}

function Board() {
  const boardStyle = {
    width: '150px',
    height: '150px',
    display: 'flex',
    flexWrap: 'wrap',
    margin: '50px auto'
  };

  // Tạo mảng từ 1 đến 9
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div style={boardStyle}>
      {numbers.map((num) => (
        <Square key={num} value={num} />
      ))}
    </div>
  );
}

export default Board;