import React, {useState} from "react";

function Note(props) {

  /*************** Hooks ***************/
  const [isFocused, setIsFocused] = useState(false);

  /*
    This ensures that only the content that has > 100 char gets the trailing dots
    while simplifying the logic of the code contained in the body of the element
  */
  function shorterContent() {
    if (props.content.length > 100) {
      return props.content.substring(0, 100) + "...";
    } else {
      return props.content;
    }
  }

  /*************** Handlers ***************/
  function handleDelete(event) {
    props.deleteNote(props.id);
    event.preventDefault();
  }


  /*************** Element Body ***************/
  /* 
    Each Note is built with the bootstrap card element and modified with minimal custom css
    (since it is a cdn).
  */
  return (
    <div className="col-md-3 col-sm-6 d-flex justify-content-around note-layout">
      <div className="card note-single">
        <div className="card-header note-header">
          <h1>{props.title}</h1>
        </div>
        <div className="card-body note-body d-flex align-items-center justify-content-center">
          {/* Toggles the full/shortened content when the body is clicked */}
          <p onClick={() => setIsFocused(!isFocused)} className="card-text">
            {isFocused ? props.content : shorterContent()}
          </p>
        </div>
        <div className="card-footer note-footer">
          <button className="btn note-delete-btn" onClick={handleDelete}>
            <img src="trash-fill.svg" alt="trash icon" className="note-delete-icon"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Note;