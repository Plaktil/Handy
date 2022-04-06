import React from "react";
import Navbar from "./Navbar";

const tools = ["Checklists", "Notes", "Calender", "Alarms"];

function App() {
  const [notes, setNotes] = React.useState([{}])

  React.useEffect(() => {
    fetch("/notes")
    .then(response => response.json())
    .then(data => setNotes(data))
  }, []);

  return (
    <Navbar menuItems={tools}/>
  )
};

export default App;
