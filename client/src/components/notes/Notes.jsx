import React, {useEffect, useState} from "react";
import NewNote from "./NewNote";
import Note from "./Note";

function Notes() {

  /*************** Hooks ***************/
  const [notes, setNotes] = useState([{"title": "", "content": ""}]);

  useEffect(() => {
    fetch("/notes")
    .then(response => response.json())
    .then(data => setNotes(data));
  }, [notes]);
  

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
    .then(response => response.json())
    .then(data => setNotes((prevNotes) => [...prevNotes, data]))
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
    .then(response => response.json())
    .then(data => setNotes(prevNotes => {
      return prevNotes.filter((item) => item._id !== data._id)
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
                content={item.content.length > 100 ? item.content.substring(0, 100) + "..." : item.content}
                deleteNote={deleteNote}
              />
            )
          })}
        </div>      
    </div>
  )
}

export default Notes;