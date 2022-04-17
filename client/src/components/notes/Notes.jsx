import React, {useEffect, useState} from "react";
import NewNote from "./NewNote";
import Note from "./Note";

function Notes() {

  /*************** Hooks ***************/
  const [notes, setNotes] = useState([{"title": "", "content": ""}]);

  /*
  Ensures anyone viewing the same page will get the notes updated
  whenever someone else adds a note.
  */
  useEffect(() => { 
    fetch("/notes")
    .then(response => response.json())
    .then(data => setNotes(data));
  }, []);
  

  /*************** Add/Delete functions ***************/
  function addNote(newNote) {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Accept": "application/json",
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({"title": newNote.title, "content": newNote.content})
    }

    fetch("/notes", requestOptions)
    .then(response => response.json()) /* API sends back the new document */
    .then(data => setNotes((prevNotes) => [...prevNotes, data])) /* And we trigger the hook by adding it to our state */
  };

  function deleteNote(noteId) {
    const requestOptions = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Accept": "application/json",
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({"id": noteId})
    }

    fetch("/notes", requestOptions)
    .then(response => response.json()) /* API sends back the deleted document */
    .then(data => setNotes(prevNotes => {
      return prevNotes.filter((item) => item._id !== data._id) /* And we trigger the hook by removing it from our state */
    }))
  };


  /*************** Element Body ***************/
  return (
    <div>
      <div>
        <NewNote addNote={addNote} />
      </div>
        <div className="row notes-container">
          {notes.map((item, index) => {
            return (
              <Note 
                key={index}
                id={item._id}
                title={item.title}
                content={item.content}
                deleteNote={deleteNote}
              />
            )
          })}
        </div>      
    </div>
  )
}

export default Notes;