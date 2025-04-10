import { TodosContext } from '../App.tsx';
import React from 'react';
import type {TodoItem} from '../types/types.ts';

export function Title() {
  const todos: Array<TodoItem> = React.useContext(TodosContext);

  return (
    <>
      <label htmlFor="sidebar_toggle">
        <img src="images/hamburger.png" alt="Toggle Sidebar" />
      </label>
      <dl>
        {/* <dt><time>{{current_section.title}}</time></dt> */}
        {/* <dd>{{current_section.data}}</dd> */}
        <dt><time>All Todos</time></dt>
        <dd>{todos.length}</dd>
      </dl>
    </>
  ) 
}