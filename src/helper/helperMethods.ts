import { TodoItem, DateProp } from '../types/types.ts';
import Server from './../serverAPI/serverAPI.tsx';

function deleteHandler( todo: TodoItem,
                        todos: TodoItem[],
                        setAllTodos: React.Dispatch<React.SetStateAction<Array<TodoItem>>>) 
{
  return (e: React.MouseEvent) => {
    e.preventDefault();

    if (typeof todo.id === 'number') {
      let id = todo.id;
      let newTodos = todos.filter(todo => todo.id !== id);
      Server.deleteTodo(todo)
        .then(response => {
          if (response.status === 204) {
            setAllTodos(sortTodos(newTodos));
          } else {
            alert('Something went wrong');
          }
        })
    }
  }
}

function onClickHandler(toggleModal: boolean, setToggleModal: React.Dispatch<React.SetStateAction<boolean>>, resetFunc?: Function) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    setToggleModal(!toggleModal);

    if (resetFunc) {
      resetFunc();
    }
  }
}

function onClickSingleItemHandler(toggleModal: boolean, 
                                  setToggleModal: React.Dispatch<React.SetStateAction<boolean>>, 
                                  todo: TodoItem,
                                  setItemState: React.Dispatch<React.SetStateAction<TodoItem>>) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    setToggleModal(!toggleModal);
    setItemState(todo);
  }
}

function clickCompleteHandler(todo: TodoItem, 
                              todos: TodoItem[],
                              setAllTodos: React.Dispatch<React.SetStateAction<Array<TodoItem>>>) 
{
  return (e: React.MouseEvent) => {
    e.preventDefault();

    if (e.target instanceof HTMLElement) {
      let target = e.target as HTMLElement;

      if (target.nodeName === 'LABEL') return;

      if (typeof todo.id === 'number') {
        let id = todo.id;
        todo.completed = !todo.completed;
        Server.updateTodo(todo)
        .then(_ => {
          let index = todos.findIndex(matchesId(id));
          let newTodos = [...todos];
          newTodos[index] = todo;
          setAllTodos(sortTodos(newTodos));
        })
      }
    }
  }
}

function onSubmitHandler( todoItem: TodoItem, 
                          toggleModal: boolean, 
                          setToggleModal: React.Dispatch<React.SetStateAction<boolean>>,
                          setAllTodos: React.Dispatch<React.SetStateAction<Array<TodoItem>>>,
                          todos: TodoItem[]) {
  return (e: React.FormEvent) => {
    e.preventDefault();
    if (checkTitle3Charcs(todoItem.title)) {
      alert('You must enter a title at least 3 characters long');
    } else {
      setToggleModal(!toggleModal);

      if (typeof todoItem.id === 'number') {
        let id = todoItem.id;
        Server.updateTodo(todoItem)
          .then(_ => {
            let index = todos.findIndex(matchesId(id));
            let newTodos = [...todos];
            newTodos[index] = todoItem;
            setAllTodos(sortTodos(newTodos));
          })
      } else {
        Server.postTodo(todoItem)
        .then(request => {
          if (request.status === 201) {
            setAllTodos(sortTodos([...todos, request.data]));
          } else {
            console.log('Something went wrong');
          }
        })
      }
    }
  }
}

function resetValues(setItemState: React.Dispatch<React.SetStateAction<TodoItem>>) {
  return () => {
    setItemState({
      completed: false,
      day: '',
      description: '',
      month: '',
      title: '',
      year: '',
    });
  }
}

// Modal Values
function todoChangeTitleHandler(itemState: TodoItem, setItemState: React.Dispatch<React.SetStateAction<TodoItem>>) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemState({...itemState, title: e.target.value});
  }
}

function todoChangeDateHandler(itemState: TodoItem, setItemState: React.Dispatch<React.SetStateAction<TodoItem>>, stringProp: DateProp) {
  return (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (stringProp) {
      case 'day':
        setItemState({...itemState, day: e.target.value});
        break;
      case 'month':
        setItemState({...itemState, month: e.target.value});
        break;
      case 'year':
        setItemState({...itemState, year: e.target.value});
        break;
    }
  }
}

function todoChangeDescriptionHandler(itemState: TodoItem, setItemState: React.Dispatch<React.SetStateAction<TodoItem>>) {
  return (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setItemState({...itemState, description: e.target.value});
  }
}

function markCompleteHandler( todo: TodoItem, 
                              todos: TodoItem[],
                              setAllTodos: React.Dispatch<React.SetStateAction<Array<TodoItem>>>,
                              toggleModal: boolean, 
                              setToggleModal: React.Dispatch<React.SetStateAction<boolean>>) {
  return (e: React.MouseEvent) => {
    e.preventDefault();

    if (typeof todo.id === 'number') {
      let id = todo.id;
      todo.completed = true;
      Server.updateTodo(todo)
        .then(_ => {
          let index = todos.findIndex(matchesId(id));
          let newTodos = [...todos];
          newTodos[index] = todo;
          setAllTodos(sortTodos(newTodos));
          setToggleModal(!toggleModal);
        })
    } else {
      alert(`Cannot mark complete for an item that hasn't been created yet!`)
    }
  }
}

function calcDueDate(todo: TodoItem) {
  if (todo.month && todo.year) {
    return `${todo.month} / ${todo.year[2] + todo.year[3]}`;
  }

  return 'No Due Date';
}

function checkTitle3Charcs(title: String) {
  return title.length <= 3;
}

function matchesId(id: number) {
  return (todo: TodoItem) => {
    return todo.id === id;
  }
}

function sortTodos(todos: TodoItem[]) {
  return todos.sort((a, b) => {
    const getGroup = (item: TodoItem): number => {
      const hasDate = item.year && item.month;
      if (!item.completed && hasDate) return 1;
      if (!item.completed && !hasDate) return 2;
      if (item.completed && hasDate) return 3;
      return 4;
    };

    const groupA = getGroup(a);
    const groupB = getGroup(b);

    if (groupA !== groupB) return groupA - groupB;

    const hasDateA = a.year && a.month;
    const hasDateB = b.year && b.month;

    if (hasDateA && hasDateB) {
      const dateA = new Date(`${a.year}-${a.month}-01`);
      const dateB = new Date(`${b.year}-${b.month}-01`);
      return dateA.getTime() - dateB.getTime();
    }

    return 0;
  });
}

export default {
  sortTodos,
  calcDueDate,
  onClickHandler,
  onSubmitHandler,
  todoChangeTitleHandler,
  todoChangeDateHandler,
  todoChangeDescriptionHandler,
  resetValues,
  checkTitle3Charcs,
  onClickSingleItemHandler,
  markCompleteHandler,
  deleteHandler,
  clickCompleteHandler,
}