import DiaryItem from './DiaryItem';

const DiaryList = ({ diaryList, onRemove }) => {
  return (
    <>
      <h2 className="title">일기 리스트</h2>
      <p className="description">{diaryList.length}개의 일기가 있습니다.</p>
      <ul className="DiaryList">
        {diaryList.map((item) => (
          <DiaryItem key={item.id} {...item} onRemove={onRemove} />
        ))}
      </ul>
    </>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
