import React, { useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryItem = ({ id, author, content, emotion, createdAt }) => {
  useEffect(() => {
    console.log(`${id}번째 일기 렌더`);
  });

  const { onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit); // 반전 연산
  const [localContent, setLocalContent] = useState(content);
  const loccalContentInput = useRef();

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 5) {
      loccalContentInput.current.focus();
      return;
    }

    if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <li className="DiaryItem">
      <div className="info">
        <span className="author">작성자: {author}</span>
        <span className="emotion">감정 점수: {emotion}</span>
        <span className="date">{new Date(createdAt).toLocaleDateString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
              ref={loccalContentInput}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button type="button" onClick={handleQuitEdit}>
            수정 취소
          </button>
          <button type="button" onClick={handleEdit}>
            수정 완료
          </button>
        </>
      ) : (
        <>
          <button
            className="button-delete"
            type="button"
            onClick={handleRemove}
          >
            삭제하기
          </button>
          <button type="button" onClick={toggleIsEdit}>
            수정하기
          </button>
        </>
      )}
    </li>
  );
};

export default React.memo(DiaryItem);
