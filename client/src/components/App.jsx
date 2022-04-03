import React from "react";
import Header from "./Header";

function App() {
  const [notes, setNotes] = React.useState([{}])

  React.useEffect(() => {
    fetch("/notes")
    .then(response => response.json())
    .then(data => setNotes(data))
  }, []);

  return (
    <Header />
  )
};

export default App;
