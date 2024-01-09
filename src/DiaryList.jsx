import { useContext, useMemo } from 'react';
import DiaryItem from './DiaryItem';
import { DiaryStateContext } from './App';

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext);

  const getDiaryAanlysis = useMemo(() => {
    const goodCount = diaryList.filter((item) => item.emotion >= 3).length;
    const badCount = diaryList.length - goodCount;
    const goodRatio = (goodCount / diaryList.length) * 100;

    return { goodCount, badCount, goodRatio };
  }, [diaryList.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAanlysis;

  return (
    <>
      <h2 className="title">일기 리스트</h2>
      <ul className="diary-anlysis-list">
        <li className="diary-anlysis-item">
          전체 일기: <strong>{diaryList.length}</strong>
        </li>
        <li className="diary-anlysis-item">
          기분 좋은 일기: <strong>{goodCount}</strong>
        </li>
        <li className="diary-anlysis-item">
          기분 나쁜 일기: <strong>{badCount}</strong>
        </li>
        <li className="diary-anlysis-item">
          기분 좋은 일기 비율: <strong>{goodRatio}</strong>
        </li>
      </ul>
      <ul className="DiaryList">
        {diaryList.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </ul>
    </>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
