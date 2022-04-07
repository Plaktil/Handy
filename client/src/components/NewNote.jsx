import React from "react";

function NewNote(props) {
    const [currentNote, setCurrentNote] = React.useState({title:"", content:""});

  function handleTextInput(event) {
    const {name, value} = event.target;
    setCurrentNote((prevNote) => {
      return ({
        ...prevNote,
        [name]: value
      });
    })
  }

  function submitNote(event) {
    props.addNote(currentNote);
    setCurrentNote({title:"", content:""});
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input value={currentNote.title} onChange={handleTextInput} name="title" placeholder="Title" />
        <textarea value={currentNote.content} onChange={handleTextInput} name="content" placeholder="Take a note..." rows="3" />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default NewNote;