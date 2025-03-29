export function SidebarAllTodos() {
  return (
    <header data-title="All Todos" data-total="{{todos.length}}" id="all_header">
      <dl>
       <dt>All Todos</dt>
         {/* <dd>{{todos.length}}</dd> */}
         <dd>100</dd>
      </dl>
    </header>
  )
}