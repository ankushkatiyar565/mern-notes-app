import { children, createContext, useEffect, useState } from "react";
import {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
} from "../services/noteService.js";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editNoteData, setEditNoteData] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await getNotes();
      setNotes(res.data || res);
    } catch (error) {
      console.log("notes lane me error aayi", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async (title, description) => {
    try {
      const res = await createNote({ title, description });
      const newNote = res.data || res;
      setNotes((prevNotes) => [...prevNotes, newNote]);
    } catch (error) {
      console.error("Note add kerne me error:", error);
    }
  };

  const removeNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((item) => item._id !== id));
    } catch (error) {
      console.error("delete kerne me error", error);
    }
  };

  const modifyNote = async (id, title, description) => {
    try {
      const res = await updateNote(id, { title, description });
      const updated = res.data || res;

      setNotes((prevNotes) =>
        prevNotes.map((item) => (item._id === id ? updated : item)),
      );
      setEditNoteData(null);
    } catch (error) {
      console.error("");
    }
  };

  const clearNotes = ()=>{
    setNotes([])
  }

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        fetchNotes,
        clearNotes,
        addNote,
        removeNote,
        editNoteData,
        setEditNoteData,
        modifyNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
