import React from "react";

function App() {
  const [notes, setNotes] = React.useState([{}])

  React.useEffect(() => {
    fetch("/notes")
    .then(response => response.json())
    .then(data => setNotes(data))
  }, []);

  return (
    <div>
    <p>{notes[0].title}</p>
    <p>{notes[0].content}</p>
    </div>
  )
};

export default App;
