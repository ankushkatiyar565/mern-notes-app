import React, { useState, useEffect, useContext } from "react";
import NoteList from "./components/NoteList";
import NoteForm from "./components/NoteForm";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { NoteContext } from "./context/NoteContext";

function App() {
  const [token, setToken] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const {fetchNotes, clearnotes} = useContext(NoteContext)
  // App load hote hi check karo kya localStorage me token pehle se hai
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Login successful hone par
  const handleLoginSuccess = () => {
  const freshToken = localStorage.getItem("token");
  setToken(freshToken)
  fetchNotes()
  };

  // Logout button dabane par
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    clearnotes()
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {/* Header bar */}
      <div className="max-w-2xl mx-auto px-4 flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📝 Notes App</h1>
        {token && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm font-medium transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Agar Token nahi hai: Login ya Signup screen dikhao */}
      {!token ? (
        showSignup ? (
          <Signup switchToLogin={() => setShowSignup(false)} />
        ) : (
          <Login
            onLoginSuccess={handleLoginSuccess}
            switchToSignup={() => setShowSignup(true)}
          />
        )
      ) : (
        /* Agar Token hai: Notes Dashboard dikhao */
        <div className="max-w-2xl mx-auto px-4">
          <NoteForm />
          <NoteList />
        </div>
      )}
    </div>
  );
}

export default App;