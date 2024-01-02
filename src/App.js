import { useRef, useState } from 'react';
import './styles/App.css';
import './styles/global.css';
import DiaryEdit from './DiaryEdit';
import DiaryList from './DiaryList';

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const createdAt = new Date().getTime();

    const newItem = {
      author,
      content,
      emotion,
      createdAt,
      id: dataId.current,
    };

    dataId.current += 1;
    setData([newItem, ...data]);
  };

  return (
    <div className="container">
      <DiaryEdit onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
