import { TodosContext } from '../App.tsx';
import React from 'react';
import type {TodoItem} from '../types/types.ts';

export function SidebarAllTodos() {
  const todos: Array<TodoItem> = React.useContext(TodosContext);

  return (
    <header data-title="All Todos" data-total="{{todos.length}}" id="all_header">
      <dl>
       <dt>All Todos</dt>
         {/* <dd>{{todos.length}}</dd> */}
         <dd>{todos.length}</dd>
      </dl>
    </header>
  )
}