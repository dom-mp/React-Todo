import {Title} from './title.tsx';
import {Item} from './item.tsx';
import {Modal} from './modal.tsx';
import { TodosContext } from '../App.tsx'
import React from 'react'
import type {TodoItem} from '../types/types.ts'
import helper from '../helper/helperMethods.ts'

interface Props {
  toggleModal: boolean,
  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>,
  itemState: TodoItem,
  setItemState: React.Dispatch<React.SetStateAction<TodoItem>>,
  setAllTodos: React.Dispatch<React.SetStateAction<Array<TodoItem>>>
}

export function Items({toggleModal, setToggleModal, itemState, setItemState, setAllTodos}: Props) {
  const todos: Array<TodoItem> = React.useContext(TodosContext);

  return (
  <div id="items" >
    <header>
      <Title />
    </header>
    <main>
      <label htmlFor="new_item" onClick={helper.onClickHandler(toggleModal, setToggleModal, helper.resetValues(setItemState))}>
        <img src="./src/images/plus.png" alt="Add Todo Item" />
        <h2>Add new to do</h2>
      </label>
      <table cellSpacing="0">
        <tbody>
          {todos.map(todo => <Item key={todo.id} 
                              todo={todo} toggleModal={toggleModal} 
                              setToggleModal={setToggleModal} 
                              setItemState={setItemState}
                              setAllTodos={setAllTodos}/>)}
        </tbody>
      </table>
      <Modal toggleModal={toggleModal} setToggleModal={setToggleModal} itemState={itemState} setItemState={setItemState} setAllTodos={setAllTodos}/>
    </main>
  </div> 
  )
}