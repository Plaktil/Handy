import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from "./Navbar";
import Notes from "./Notes"
import Checklists from "./Checklists";
import Calendar from "./Calendar";

const tools = ["Checklists", "Notes", "Calender", "Alarms"];

function App() {
  // const [notes, setNotes] = useState([{}]);
  const [checklists, setChecklists] = useState([{}]);
  const [calendar, setCalendar] = useState([{}]);

  const [notes, setNotes] = useState([])

  function addNote(newNote) {
    setNotes(prevNotes => [...prevNotes, newNote]);
  }

  function deleteNote(id) {
    setNotes((prevNotes => {
      return prevNotes.filter((note, index) => index !== id)
    }));
  }

  useEffect(() => {
    // fetch("/notes")
    // .then(response => response.json())
    // .then(data => setNotes(data));

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
