import React, { useState } from 'react'
import { loginuser } from '../services/authService'

function Login({onLoginSuccess,switchToSignup}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error,setError] = useState('')

const handleSubmit = async (e) =>{
    e.preventDefault()
    setError('')

    try{
        const data = await loginuser({email,password})
        if(data.token){
            localStorage.setItem("token",data.token)
            onLoginSuccess()
        }
    }
    catch(error){
        setError(error.response?.data?.message || "Login fail ho gya")
    }
}

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Login</h2>

      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Account nahi hai?{" "}
        <button
          onClick={switchToSignup}
          type="button"
          className="text-blue-600 font-semibold hover:underline"
        >
          Signup karein
        </button>
      </p>
    </div>
  )
}

export default Login
