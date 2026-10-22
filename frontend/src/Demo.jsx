import React, { useEffect, useState } from "react";
import axios, { Axios } from "axios";
function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [notes, setNotes] = useState([]);

  const [editId, setEditId] = useState(null);

  async function fetchUser() {
    try {
      const res = await axios.get("http://localhost:3000/notes");
      setNotes(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function notesdata(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/notes/create", {
        title,
        description,
      });
      console.log("data send succesfully", res.data);
      setNotes([...notes, res.data.data]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(note) {
    setTitle(note.title);
    setDescription(note.description);
    setEditId(note._id);
  }

  async function updateData(e) {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:3000/notes/update/${editId}`,
        {
          title,
          description,
        },
      );
      console.log("data updated successfully", res.data);
      setNotes(
        notes.map((item) => (item._id === editId ? res.data.data : item)),
      );
      setEditId(null);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteData(id) {
    try {
      const res = await axios.delete(`http://localhost:3000/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
      console.log("Note deleted successfully");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <form onSubmit={editId ? updateData : notesdata}>
        <input
          type="text"
          value={title}
          className="border-1"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="enter the text.."
        />

        <textarea
          value={description}
          className="border-1"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="enter the description"
        />

        {editId ? (
          <div>
            <button
              type="submit"
              className="bg-yellow-500 py-1 px-2 m-3 rounded-lg"
            >
              Update Note
            </button>
            <button
              type="submit"
              onClick={() => {
                setEditId(null);
                setTitle("");
                setDescription("");
              }}
              className="bg-gray-500 py-1 px-3 m-2 rounded-lg text-white"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button type="submit" className="bg-red-500 py-1 px-2 m-3 rounded-lg">
            Submit Notes
          </button>
        )}
      </form>

      <div>
        <h1>Notes Data</h1>
        <div>
          <ul>
            {notes &&
              notes.map((note, _id) => (
                <div key={note._id}>
                  <li>Title:{note.title}</li>
                  <li>Description:{note.description}</li>
                  <button
                    onClick={() => deleteData(note._id)}
                    className="bg-pink-400 py-1 px-2 m-3 rounded-lg"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit(note)}
                    className="bg-gray-400 ml-3 py-1 px-4 m-3 rounded-lg"
                  >
                    Edit
                  </button>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
