import {
  createContext,
  useContext,
  useState,
  useReducer,
  useMemo,
} from 'react';
import { Todo, TodoActionKind } from '../interfaces/todo';

// An interface for our actions
interface TodoAction {
  type: TodoActionKind;
  payload: Todo & Todo[];
}

type State = {
  todos: Todo[];
};

const TodosContext = createContext([]);
const UserContext = createContext({});
const UiContext = createContext({});

const initialState: State = {
  todos: [],
};

const reducer = (state: State, action: TodoAction): State => {
  const mutatedItem = action.payload;
  if (!mutatedItem) {
    return state;
  }
  const mutatedIndex = state.todos.findIndex(
    (item) => item.id === mutatedItem.id
  );

  switch (action.type) {
    case TodoActionKind.CREATE: {
      const newTodos = [...state.todos];
      if (mutatedIndex < 0) {
        newTodos.push(mutatedItem);
      }

      return { ...state, todos: newTodos };
    }
    case TodoActionKind.UPDATE: {
      return { ...state, todos: [...state.todos, mutatedItem] };
    }

    case TodoActionKind.RESHUFFLE: {
      return { ...state, todos: [...action.payload] };
    }

    case TodoActionKind.DELETE:
      if (mutatedIndex >= 0) {
        return {
          ...state,
          todos: state.todos.filter((item) => item.id !== mutatedItem.id),
        };
      }

      break;

    default:
      return state;
  }

  return state;
};

export function TodosProvider({ children }: { children: JSX.Element }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TodosContext.Provider value={[state, dispatch]}>
      {children}
    </TodosContext.Provider>
  );
}

export function UserProvider({ children }: { children: JSX.Element }) {
  const [isDarkMode, setDarkMode] = useState(false);
  const [isListView, setListView] = useState(false);

  const userValue = useMemo(() => {
    return [
      {
        isDarkMode,
        isListView,
      },
      {
        toggleDarkMode: () => setDarkMode(!isDarkMode),
        toggleView: () => setListView(!isListView),
      },
    ];
  }, [isDarkMode, isListView]);
  return (
    <UserContext.Provider value={userValue}>{children}</UserContext.Provider>
  );
}

export function UiProvider({ children }: { children: JSX.Element }) {
  const [isNavBarOpen, setNavBarOpen] = useState(true);
  const [noteInEditMode, setNoteInEditMode] = useState('');

  const uiValue = useMemo(() => {
    return [
      {
        isNavBarOpen,
        noteInEditMode,
      },
      {
        toggleNavBar: () => setNavBarOpen((prev) => !prev),
        setNoteInEditMode,
        setNavBarOpen,
      },
    ];
  }, [isNavBarOpen, noteInEditMode]);
  return <UiContext.Provider value={uiValue}>{children}</UiContext.Provider>;
}

export const useTodosStore = () => useContext(TodosContext);
export const useUserStore = () => useContext(UserContext);
export const useUiStore = () => useContext(UiContext);
