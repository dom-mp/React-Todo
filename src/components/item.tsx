import type {TodoItem} from '../types/types.ts'
import helper from '../helper/helperMethods.ts'
import { TodosContext } from '../App.tsx'
import React from 'react'

interface Props {
  todo: TodoItem,
  toggleModal: boolean,
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>,
  setItemState: React.Dispatch<React.SetStateAction<TodoItem>>,
  setAllTodos: React.Dispatch<React.SetStateAction<Array<TodoItem>>>,
}

export function Item({todo, toggleModal, setToggleModal, setItemState, setAllTodos}: Props): React.JSX.Element {
  const todos: Array<TodoItem> = React.useContext(TodosContext);

  return (
    <tr data-id={todo.id}>
      <td className="list_item" onClick={helper.clickCompleteHandler(todo, todos, setAllTodos)}>
        <input type="checkbox" name={`item_${todo.id}`} id={`item_${todo.id}`} 
           checked={todo.completed} readOnly/>
        <span className="check"></span>
        <label htmlFor="item_{{id}}" onClick={helper.onClickSingleItemHandler(toggleModal, setToggleModal, todo, setItemState)}>
          {todo.title} - {helper.calcDueDate(todo)}</label>
      </td>
      <td className="delete" onClick={helper.deleteHandler(todo, todos, setAllTodos)}><img src="./src/images/trash.png" alt="Delete"/></td>
    </tr>    
  )
}