import { useEffect, useRef, useState } from 'react';
import './styles/App.css';
import './styles/global.css';
import DiaryEdit from './DiaryEdit';
import DiaryList from './DiaryList';

function App() {
  const [data, setData] = useState([]);
  const dataId = useRef(0);

  const getData = async () => {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/comments'
    );
    const body = await response.json();

    const initData = body.slice(0, 20).map((item) => {
      return {
        author: item.email,
        content: item.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        createdAt: new Date().getTime(),
        id: dataId.current++,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

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

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) =>
        item.id === targetId ? { ...item, content: newContent } : item
      )
    );
  };

  const getDiaryAanlysis = () => {
    console.log('분석 시작');
    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;

    return { goodCount, badCount, goodRatio };
  };

  const { goodCount, badCount, goodRatio } = getDiaryAanlysis();

  return (
    <div className="container">
      <DiaryEdit onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기: {goodCount}</div>
      <div>기분 나쁜 일기: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
