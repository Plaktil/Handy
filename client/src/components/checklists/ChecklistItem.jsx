import React, {useState} from "react";

function ChecklistItem(props) {

  const [isChecked, setIsChecked] = useState(props.checked);

  function handleDelete(event) {
    props.deleteChecklistItem(props._id);
    event.preventDefault();
  }

  function handleCheck(event) {
    // TODO: Update (PATCH) call to api to change the checked property of the item.
    setIsChecked(!isChecked);
    event.preventDefault();
  }

    return (
      <div>
        <button className="btn checklist-item-check-btn" onClick={handleCheck}>
          <img src={isChecked ? "check-circle-fill.svg" : "check-circle.svg"} alt="check icon" className="checklist-item-check-icon"/>
        </button>
        <p style={isChecked ? {"textDecoration" : "line-through"} : {}} key={props._id}>{props.content}</p>
      </div>
    )

}

export default ChecklistItem;