import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import './styles/App.css';
import './styles/global.css';
import DiaryEdit from './DiaryEdit';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }
    case 'CREATE':
      const createdAt = new Date().getTime();
      const newItem = { ...action.data, createdAt };
      return [newItem, ...state];
    case 'REMOVE': {
      return state.filter((item) => item.id !== action.targetId);
    }
    case 'EDIT': {
      return state.map((item) =>
        item.id === action.targetId
          ? { ...item, content: action.newContent }
          : item
      );
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);

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
    dispatch({ type: 'INIT', data: initData });
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: 'CREATE',
      data: { author, content, emotion, id: dataId.current },
    });

    dataId.current += 1;
  }, []);

  const onRemove = useCallback((targetId) => {
    dispatch({ type: 'REMOVE', targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: 'EDIT', targetId, newContent });
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onEdit, onRemove };
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="container">
          <DiaryEdit />
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
