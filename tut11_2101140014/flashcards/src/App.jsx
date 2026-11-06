import React, { Component } from 'react';
import './App.css'; // Đảm bảo bạn đã import file CSS

const dict = {
  "pretty": "xinh đẹp",
  "car": "xe hơi",
  "study": "học tập",
  "life": "cuộc sống",
  "enormous": "to lớn",
  "computer": "máy tính"
};

const words = Object.keys(dict);
const meanings = Object.values(dict);
const totalWords = words.length;

// Function Component hiển thị thẻ từ vựng tiếng Anh
function WordCard({ word }) {
  return (
    <div className="flashcard word">
      {word}
    </div>
  );
}

// Function Component hiển thị thẻ định nghĩa (nghĩa tiếng Việt)
function DefinitionCard({ meaning }) {
  return (
    <div className="flashcard definition">
      {meaning}
    </div>
  );
}

// Function Component hiển thị thanh trạng thái và các nút điều hướng
function StatusBar({ current, total, nextWord, backWord }) {
  return (
    <div className="status">
      <button onClick={backWord}>&lt;</button>
      <span> {current + 1} / {total} </span>
      <button onClick={nextWord}>&gt;</button>
    </div>
  );
}

// Class Component chính
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  nextWord = () => {
    this.setState((prevState) => ({
      current: prevState.current < totalWords - 1 ? prevState.current + 1 : prevState.current
    }));
  }

  backWord = () => {
    this.setState((prevState) => ({
      current: prevState.current > 0 ? prevState.current - 1 : prevState.current
    }));
  }

  render() {
    const { current } = this.state;
    return (
      <div id="main">
        <div className="flashcard-box">
          <WordCard word={words[current]} />
          <DefinitionCard meaning={meanings[current]} />
          <StatusBar current={current} total={totalWords} nextWord={this.nextWord} backWord={this.backWord}/>
        </div>
      </div>
    );
  }
}

export default App;