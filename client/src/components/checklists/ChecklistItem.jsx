import React, {useState} from "react";

/*
  At some point, I want the user to be able to modify each checklist item individually by 
  clicking the item. This will require to make calls to the db efter the user focus leaves the field to update
  the field, or to set up a update call only when the user browses away from the page.
  
  Since I intend on using the app simultaneously with someone else, I would rather implement the former.
*/

function ChecklistItem(props) {

  const [isChecked, setIsChecked] = useState(props.checked);

  function handleDelete(event) {
    props.deleteChecklistItem(props.id);
    event.preventDefault();
  }

  function handleCheck(event) {
    // TODO: Update (PATCH) call to api to change the checked property of the item.
    setIsChecked(!isChecked);
    event.preventDefault();
  }

    return (
      <div className="row ">
        <button className="col-2 btn checklist-item-check-btn" onClick={handleCheck}>
          <img src={isChecked ? "check-circle-fill.svg" : "check-circle.svg"} alt="check icon" className="checklist-item-check-icon"/>
        </button>
        <p className="col checklist-item" style={isChecked ? {"textDecoration" : "line-through", "textDecorationColor": "black", "color": "rgb(204, 140, 126)"} : {}} key={props.id}>{props.content}</p>
        <button className="col-2 btn checklist-item-check-btn" onClick={handleCheck}>
          <img src="x-circle.svg" alt="check icon" className="checklist-item-delete-icon"/>
        </button>
      </div>
    )

}

export default ChecklistItem;