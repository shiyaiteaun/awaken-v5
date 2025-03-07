'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './login.css'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth')
        if (response.ok) {
          // If authenticated, redirect to dashboard
          router.push('/admin/dashboard')
        } else {
          // If not authenticated, show login form
          setIsLoading(false)
        }
      } catch (err) {
        // On error, show login form
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        router.push('/admin/dashboard')
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Checking authentication...</p>
      </div>
    )
  }

  return (
    <div className="admin-login-container">
      <div className="login-box">
        <h1>Admin Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
} 