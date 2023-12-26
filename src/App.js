import './styles/App.css';
import './styles/global.css';
import DiaryEdit from './DiaryEdit';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: '삼달',
    content: '즐거움',
    emotion: 3,
    createdAt: new Date().getTime(),
  },
  {
    id: 2,
    author: '용필',
    content: '기쁨',
    emotion: 5,
    createdAt: new Date().getTime(),
  },
  {
    id: 3,
    author: '상도',
    content: '화남',
    emotion: 2,
    createdAt: new Date().getTime(),
  },
  {
    id: 4,
    author: '경태',
    content: '피곤함',
    emotion: 4,
    createdAt: new Date().getTime(),
  },
  {
    id: 5,
    author: '은우',
    content: '신남',
    emotion: 5,
    createdAt: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="container">
      <DiaryEdit />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
