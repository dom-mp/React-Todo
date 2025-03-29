import {SidebarAllTodos} from './sidebarAllTodos.tsx'
import {SidebarAllCompletedTodos} from './sidebarAllCompletedTodos.tsx'
import {SidebarTodo} from './sidebarTodo.tsx'

export function Sidebar() {
  return (
    <div id="sidebar" >
    <section id="all">
      <div id="all_todos">
        <SidebarAllTodos />
      </div>
      <article id="all_lists">
        <SidebarTodo/>
      </article>
    </section>
    <section className="completed" id="completed_items">
      <div id="completed_todos">
        <SidebarAllCompletedTodos/>
      </div>
      <article id="completed_lists">
        <SidebarTodo/>
      </article>
    </section>
  </div>
  )
}