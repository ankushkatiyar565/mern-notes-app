import { useState } from "react";
import { registerUser } from "../services/authService";

function Signup({ switchToLogin }) {
  // ✅ Empty strings ("") use karo, space (" ") nahi
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // trim() lagana safe rehta hai taaki extra spaces na jayein
      await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      setSuccess("Account ban gaya! ab login karein...");
      setTimeout(() => {
        switchToLogin();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Signup fail ho gya");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create Account</h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-600 p-2 rounded mb-4 text-sm text-center">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded mt-1 focus:outline-blue-500"
            placeholder="Aapka Naam"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded mt-1 focus:outline-blue-500"
            placeholder="apna@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded mt-1 focus:outline-blue-500"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-medium hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Pehle se account hai?{" "}
        <button
          onClick={switchToLogin}
          type="button"
          className="text-blue-600 font-semibold hover:underline"
        >
          Login karein
        </button>
      </p>
    </div>
  );
}

export default Signup;