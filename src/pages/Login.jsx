// src/pages/Login.jsx
import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { authAPI } from '../services/api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext || {})
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    
    if(!email || !password){ 
      setError('Please fill in both fields')
      return 
    }
    
    setLoading(true)
    try {
      const data = await authAPI.login({ email, password })
      
      if(data.error){
        setError(data.error)
      } else {
        login(data.user, data.token)
        navigate('/dashboard')
      }
    } catch (err) {
      setError('Server error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white rounded-xl shadow-xl p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 text-sm">Login to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-shake">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              type="email"
              placeholder="Enter your email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              type="password" 
              placeholder="Enter your password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-600 hover:text-purple-700 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
