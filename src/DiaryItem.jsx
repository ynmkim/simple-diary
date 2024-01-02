const DiaryItem = ({ id, author, content, emotion, createdAt, onRemove }) => {
  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  return (
    <li className="DiaryItem">
      <div className="info">
        <span className="author">작성자: {author}</span>
        <span className="emotion">감정 점수: {emotion}</span>
        <span className="date">{new Date(createdAt).toLocaleDateString()}</span>
      </div>

      <div className="content">{content}</div>
      <button className="button-delete" type="button" onClick={handleRemove}>
        삭제하기
      </button>
    </li>
  );
};

export default DiaryItem;
