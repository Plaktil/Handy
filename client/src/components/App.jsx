import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./Navbar";
import Notes from "./notes/Notes"
import Checklists from "./Checklists";
import Calendar from "./Calendar";

const tools = ["Checklists", "Notes", "Calender", "Alarms"];

function App() {
  const [notes, setNotes] = useState([{}]);
  const [checklists, setChecklists] = useState([{}]);
  const [calendar, setCalendar] = useState([{}]);

  function addNote(newNote) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({title:"hey", content: "wassup"})
    }

    fetch("/notes", requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setNotes(data)
    })
  };

  function deleteNote(id) {
    setNotes((prevNotes => {
      return prevNotes.filter((note, index) => index !== id)
    }));
  }

  useEffect(() => { // For now, gets the data needed
    fetch("/notes")
    .then(response => response.json())
    .then(data => setNotes(data));

    fetch("/checklists")
    .then(response => response.json())
    .then(data => setChecklists(data));

    fetch("/calendar")
    .then(response => response.json())
    .then(data => setCalendar(data));
  }, []);

  return (
    <Router>
      <Navbar menuItems={tools}/>
      <Routes>
        <Route path="/notes" element={<Notes deleteNote={deleteNote} addNote={addNote} data={notes} />} />
        <Route path="/checklists" element={<Checklists data={checklists} />} />
        <Route path="/calendar" element={<Calendar data={calendar} />} />
      </Routes>
    </Router>
  )
};

export default App;
