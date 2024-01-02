import { useState, useRef } from 'react';

const DiaryEdit = ({ onCreate }) => {
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: '',
    content: '',
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.author.length < 1) {
      authorInput.current.focus();
      return;
    }

    if (state.content.length < 5) {
      contentInput.current.focus();
    }

    onCreate(state.author, state.content, state.emotion);

    alert('저장완료');

    setState({
      author: '',
      content: '',
      emotion: 1,
    });
  };

  return (
    <div className="DiaryEdit">
      <h2 className="title">오늘의 일기</h2>
      <div>
        <label htmlFor="author">작성자</label>
        <input
          type="text"
          id="author"
          name="author"
          value={state.author}
          onChange={handleChangeState}
          ref={authorInput}
        />
      </div>
      <div>
        <label htmlFor="content">내용</label>
        <textarea
          id="content"
          name="content"
          value={state.content}
          onChange={handleChangeState}
          ref={contentInput}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>

      <button type="submit" onClick={handleSubmit}>
        일기 저장하기
      </button>
    </div>
  );
};

export default DiaryEdit;
