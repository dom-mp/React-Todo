export function SidebarAllCompletedTodos() {
  return (
    <header data-title="Completed" data-total="{{done.length}}" id="all_done_header">
      <dl>
       <dt>Completed</dt>
        <dd>xx</dd>
        {/* <dd>{{done.length}}</dd> */}
      </dl>
    </header>
  )
}