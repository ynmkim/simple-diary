const DiaryItem = ({ author, content, emotion, createdAt }) => {
  return (
    <li className="DiaryItem">
      <div className="info">
        <span className="author">작성자: {author}</span>
        <span className="emotion">감정 점수: {emotion}</span>
        <span className="date">{new Date(createdAt).toLocaleString()}</span>
      </div>

      <div className="content">{content}</div>
    </li>
  );
};

export default DiaryItem;
