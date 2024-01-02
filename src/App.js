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

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((item) => item.id !== targetId);
    setData(newDiaryList);
  };

  return (
    <div className="container">
      <DiaryEdit onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} />
    </div>
  );
}

export default App;
