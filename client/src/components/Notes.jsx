import React from "react";
import NewNote from "./NewNote";
import Note from "./Note";

function Notes(props) {
  return (
    <div>
      <div>
        <NewNote addNote={props.addNote} />
      </div>
      <div>
        {props.data.map((item, index) => {
          return (
            <Note 
              key={index}
              id={index}
              title={item.title}
              content={item.content}
              deleteNote={props.deleteNote}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Notes;