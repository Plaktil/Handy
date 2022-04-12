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
import Alarms from "./Alarms";

const menuItems = ["checklists", "notes", "calendar", "alarms"];

function App() {
  
  const [checklists, setChecklists] = useState([{}]);
  const [calendar, setCalendar] = useState([{}]);
  const [alarms, setalarms] = useState([{}]);

  //   useEffect(() => { // For now, gets the data needed
  //   fetch("/notes")
  //   .then(response => response.json())
  //   .then(data => setNotes(data));

  //   fetch("/checklists")
  //   .then(response => response.json())
  //   .then(data => setChecklists(data));

  //   // fetch("/calendar")
  //   // .then(response => response.json())
  //   // .then(data => setCalendar(data));

  //   // fetch("/alarms")
  //   // .then(response => response.json())
  //   // .then(data => setCalendar(data));
  // }, []);

  

  return (
    <div id="custom-css">
      <Router>
        <Navbar menuItems={menuItems}/>
        {/* These should not be considered as different pages, only different views of the same page.*/}
        <Routes>
          <Route path="/" element={<h1>Welcome to the Handy App.</h1>} />
          <Route path="/notes" element={<Notes/>} />
          <Route path="/checklists" element={<Checklists data={checklists} />} />
          <Route path="/calendar" element={<Calendar data={calendar} />} />
          <Route path="/alarms" element={<Alarms data={alarms} />} />
        </Routes>
      </Router>
    </div>
    
  )
};

export default App;
