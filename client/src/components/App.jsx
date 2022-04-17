import React, {useEffect, useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./Navbar";
import Notes from "./notes/Notes"
import Checklists from "./checklists/Checklists";
import Calendar from "./Calendar";
import Alarms from "./Alarms";

/* This is for the Navbar to render the available pages as links */
const menuItems = ["checklists", "notes", "calendar", "alarms"];

function App() {
  
  
  /*************** Hooks ***************/
  /* Those will be moved to their respective files once they are implemented */
  
  const [calendar, setCalendar] = useState([{}]);
  const [alarms, setalarms] = useState([{}]);

  /* These are only there for reference */

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

  
/*************** Element Body ***************/
  return (
    <div id="custom-css">
      <Router>
        <Navbar menuItems={menuItems}/>
        <Routes>
          {/* Once implemented, the landing page should show the latest items added to the app */}
          <Route path="/" element={<h1>Welcome to the Handy App.</h1>} />
          {/* Those should be generated from the menuItems array once they are all implemented */}
          <Route path="/notes" element={<Notes/>} />
          <Route path="/checklists" element={<Checklists/>} />
          <Route path="/calendar" element={<Calendar data={calendar} />} />
          <Route path="/alarms" element={<Alarms data={alarms} />} />
        </Routes>
      </Router>
    </div>
    
  )
};

export default App;
