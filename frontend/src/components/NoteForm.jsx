import React, { useContext, useEffect, useState } from "react";
import { NoteContext } from "../context/NoteContext";

function NoteForm() {
  const { addNote,editNoteData ,setEditNoteData,modifyNote } = useContext(NoteContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

useEffect(() => {
    if (editNoteData) {
      setTitle(editNoteData.title);
      setDescription(editNoteData.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editNoteData]);
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title aur description dono bharo!");
      return; 
    }
    if(editNoteData){
      modifyNote(editNoteData._id,title,description)
    }
    else{
      addNote(title,description)
    }
    setTitle("")
    setDescription("")
  }




  return (
    <div>
      <div className="max-w-xl mx-auto my-6 p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-3">
          {editNoteData ? "✏️ Edit Note" : "➕ Add a New Note"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-blue-500"
          />

          <textarea
            rows="3"
            placeholder="Note description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 text-sm outline-none focus:border-blue-500 resize-none"
          />

          <div className="flex gap-2">
          <button
            type="submit"
            className={`font-medium py-2 px-4 rounded-lg text-sm text-white transition-colors ${
              editNoteData
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editNoteData ? "Update Note" : "Add Note"}
          </button>

          {/* Agar edit chal raha hai toh cancel karne ka option */}
          {editNoteData && (
            <button
              type="button"
              onClick={() => setEditNoteData(null)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg text-sm"
            >
              Cancel
            </button>
          )}
        </div>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
