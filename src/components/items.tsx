import {Title} from './title.tsx';
import {Item} from './item.tsx';
import {Modal} from './modal.tsx';

export function Items() {
  return (
  <div id="items" >
    <header>
      <Title />
    </header>
    <main>
      <label htmlFor="new_item">
        <img src="./src/images/plus.png" alt="Add Todo Item" />
        <h2>Add new to do</h2>
      </label>
      <table cellSpacing="0">
        <tbody>
          <Item />
        </tbody>
      </table>
      <Modal />
    </main>
  </div> 
  )
}