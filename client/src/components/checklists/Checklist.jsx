import React from "react";
import ChecklistItem from "./ChecklistItem";

function Checklist(props) {


  return (
    <div className="col-md-3 col-sm-6 d-flex justify-content-around note-layout">
      <div className="card note-single">
        <div className="card-header note-header">
          <h1>{props.title}</h1>
        </div>
        <div className="card-body note-body d-flex align-items-center justify-content-center">
          {/* Toggles the full/shortened content when the body is clicked */}
          <ul>
            {props.items.map((item, index) => {
              return (
                <ChecklistItem 
                  key={index}
                  id={item._id}
                  content={item.content}
                  checked={item.checked}
                  deleteChecklistItem={props.deleteChecklistItem}
                />
              )
            })}
          </ul>
        </div>
        <div className="card-footer note-footer">
          <button className="btn note-delete-btn" onClick={() => console.log("delete")}>
            <img src="trash-fill.svg" alt="trash icon" className="note-delete-icon"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checklist;