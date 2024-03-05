import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    // Fetch notes from the backend when the component mounts
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/todoapp/get-notes"
      );
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async () => {
    try {
      await axios.post("http://localhost:3001/api/todoapp/add-notes", {
        newNotes: newNote,
      });
      // Refresh notes after adding a new one
      fetchNotes();
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3001/api/todoapp/delete-notes?id=${id}`
      );
      // Refresh notes after deleting one
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="App">
      <h1>TODO App</h1>
      <div className="add-note-section">
        <h2>Add a New Note</h2>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className="add-button" onClick={addNote}>
          Add Note
        </button>
      </div>
      <div className="notes-section">
        <h2>Notes</h2>
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              {note.description}
              <button
                className="delete-button"
                onClick={() => deleteNote(note.id)}
              >
                <span role="img" aria-label="delete-icon">
                  ❌
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
