export function Item() {
  return (
  <tr  data-id="{{id}}" >
    <td className="list_item">
    {/* {{#if completed}} */}
    <input type="checkbox" name="item_{{id}}" id="item_{{id}}" checked/>
    {/* {{else}} */}
    <input type="checkbox" name="item_{{id}}" id="item_{{id}}"/>
    {/* {{/if}} */}
    <span className="check"></span>
    <label htmlFor="item_{{id}}">Title - 03/10</label></td>
    {/* <label for="item_{{id}}">{{title}} - {{due_date}}</label></td> */}
    <td className="delete"><img src="./src/images/trash.png" alt="Delete"/></td>
  </tr>    
  )
}