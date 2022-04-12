import React from "react";

function Note(props) {

  function handleDelete(event) {
    props.deleteNote(props.id);
    event.preventDefault();
  }

  return (
    <div className="col-md-3 col-sm-6 d-flex justify-content-around note-layout">
      <div className="card note-single">
        <div className="card-header note-header">
          <h1>{props.title}</h1>
        </div>
        <div className="card-body note-body d-flex align-items-center justify-content-center">
          <p className="card-text">{props.content}</p>
        </div>
        <div className="card-footer note-footer">
          <button className="btn waves-effect waves-light note-delete-btn" onClick={handleDelete}>
            <img src="trash-fill.svg" alt="trash icon" className="note-delete-icon"/>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Note;