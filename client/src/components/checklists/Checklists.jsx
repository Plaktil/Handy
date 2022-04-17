import React, {useEffect, useState} from "react";
import Checklist from "./Checklist";

/* Not yet implemented */
/* Next one on the list */

function Checklists() {

  const [checklists, setChecklists] = useState([{"title": "", "items": []}]);

  useEffect(() => { 
    fetch("/checklists")
    .then(response => response.json())
    .then(data => setChecklists(data));
  }, []);


  /*************** Add/Delete functions ***************/
  function addChecklistItem(newChecklistItem) {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        "Accept": "application/json",
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        "title": newChecklistItem.title,
        "content": newChecklistItem.content,
        "checked": newChecklistItem.checked
      })
    }

    fetch("/checklists", requestOptions)
    .then(response => response.json()) /* API sends back the new document */
    .then(data => setChecklists((prevChecklists) => {

      let newCheckLists = [...prevChecklists];
      let insertIndex = -1;
      
      for (let i=0; i<prevChecklists.length; i++) { /* Find the index of the previous copy of the updated checklist */
        if (prevChecklists[i]._id === data._id) {
          insertIndex = i;
          break
        }
      }

      if (insertIndex !== -1) { /* If it was an existing checklist... */
        newCheckLists[insertIndex] = data; /* ...update it,...*/
      } else {
        newCheckLists.push(data); /* ...otherwise add it to the array*/
      }

      return newCheckLists;
    }))
  };


  function deleteChecklistItem(checklistItemid) {
    const requestOptions = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Accept": "application/json",
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({"id": checklistItemid})
    }

    fetch("/notes", requestOptions)
    .then(response => response.json()) /* API sends back the deleted document */
    .then(data => setChecklists((prevChecklists) => {

      let newCheckLists = [...prevChecklists];
      
      for (let i=0; i<prevChecklists.length; i++) { /* Find the index of the previous copy of the updated checklist */
        if (prevChecklists[i]._id === data._id) {
          newCheckLists[i] = data; /* ...and update it*/
          break
        }
      }

      return newCheckLists
    }))
  }


  /*************** Element Body ***************/
  return (
    <div>
      {/* <div>
        <NewNote addNote={addNote} />
      </div> */}
        <div className="row notes-container">
          {checklists.map((list, index) => {
            return (
              <Checklist 
                key={index}
                id={list._id}
                title={list.title}
                items={list.items}
                addChecklistItem={addChecklistItem}
                deleteChecklistItem={deleteChecklistItem}
              />
            )
          })}
        </div>      
    </div>
  )
}

export default Checklists;