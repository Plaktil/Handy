import React from "react";

function NewNote(props) {

  /*************** Hooks ***************/
  const [currentNote, setCurrentNote] = React.useState({title:"", content:""});


  /*************** Handlers ***************/
  function handleTextInput(event) {
    const {name, value} = event.target;
    setCurrentNote((prevNote) => {
      return ({
        ...prevNote,
        [name]: value
      });
    })
  }

  function handleAdd(event) {
    if (currentNote.title !== "" && currentNote.content !== "") {
      props.addNote(currentNote)
      setCurrentNote({title:"", content:""});
    }
    event.preventDefault();
  }


  /*************** Element Body ***************/
  return ( /* The new note section is also a card */
      <form>
        <div className="row notes-container">
          <div className="col d-flex justify-content-center note-layout">
            <div className="card new-note">
              <div className="card-header note-header">
                <h1>
                  <input autoFocus="true" /* With inputs styled like the other Notes */
                    className="new-note-title"
                    value={currentNote.title} 
                    onChange={handleTextInput} 
                    name="title" 
                    placeholder="Title" 
                  />
                </h1>
              </div>
              <div className="card-body note-body d-flex align-items-center justify-content-center">
                <textarea 
                  className="new-note-content" 
                  value={currentNote.content} 
                  onChange={handleTextInput} 
                  name="content" 
                  placeholder="Take a note..." 
                  rows="3" 
                />
              </div>
              <div className="card-footer note-footer">
                <button className="btn note-add-btn" onClick={handleAdd}>
                  <img src="plus-fill.svg" alt="plus icon" className="note-add-icon"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
  );
}

export default NewNote;