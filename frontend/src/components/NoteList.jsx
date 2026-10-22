import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

function NoteList() {
  const { notes, loading, removeNote, setEditNoteData } =
    useContext(NoteContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-500 font-medium">Notes load ho rahe hain...</span>
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 mt-6 max-w-2xl mx-auto">
        <p className="text-gray-500 text-base font-medium">
          Abhi koi notes nahi hain!
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Upar form se apna pehla note add karein.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 px-2">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">
          Aapke Notes
        </h2>
        <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-1 rounded-full">
          Total: {notes.length}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="p-5 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-lg text-gray-900 leading-snug">
                  {note.title}
                </h3>
                {note.user?.name && (
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium whitespace-nowrap">
                    👤 {note.user.name}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mt-2 whitespace-pre-wrap leading-relaxed">
                {note.description}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-50">
              <button
                onClick={() => setEditNoteData(note)}
                className="inline-flex items-center gap-1 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs px-3 py-1.5 rounded-lg font-medium transition"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => removeNote(note._id)}
                className="inline-flex items-center gap-1 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs px-3 py-1.5 rounded-lg font-medium transition"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteList;