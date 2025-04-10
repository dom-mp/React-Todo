import React from 'react';
import Server from './serverAPI/serverAPI.tsx';
import {Sidebar} from './components/sidebar.tsx';
import {Items} from './components/items.tsx';
import type {TodoItem} from './types/types.ts'
import helper from './helper/helperMethods.ts'
import './stylesheets/todo.css';

export const TodosContext = React.createContext<Array<TodoItem>>([]);

export function App() {
  const [allTodos, setAllTodos] = React.useState<Array<TodoItem>>([]);
  const [toggleModal, setToggleModal] = React.useState(false);
  const [itemState, setItemState] = React.useState<TodoItem>({
    completed: false,
    day: '',
    description: '',
    month: '',
    title: '',
    year: '',
  });

  React.useEffect(() => {
    Server.getTodos()
      .then(data => {
        setAllTodos(helper.sortTodos(data));
      })
  }, []);


  return (
    <TodosContext.Provider value={allTodos}>
      <Sidebar />
      <Items toggleModal={toggleModal} setToggleModal={setToggleModal} itemState={itemState} setItemState={setItemState} setAllTodos={setAllTodos}/>
    </TodosContext.Provider>
  )
}
