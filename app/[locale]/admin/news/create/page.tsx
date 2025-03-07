'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import '../news-form.css'

export default function CreateNewsItem() {
  const [formData, setFormData] = useState({
    type: 'event',
    title: '',
    date: '',
    description: '',
    imageFile: null as File | null,
    imagePreview: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth')
        if (!response.ok) {
          router.push('/admin/login')
        } else {
          setIsLoading(false)
        }
      } catch (err) {
        router.push('/admin/login')
      }
    }

    checkAuth()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imagePreview: URL.createObjectURL(file),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!formData.imageFile) {
      setError('Please select an image')
      setIsLoading(false)
      return
    }

    try {
      // Create form data for file upload
      const uploadData = new FormData()
      uploadData.append('type', formData.type)
      uploadData.append('title', formData.title)
      uploadData.append('date', formData.date)
      uploadData.append('description', formData.description)
      uploadData.append('image', formData.imageFile)

      const response = await fetch('/api/news', {
        method: 'POST',
        body: uploadData,
      })

      if (!response.ok) {
        throw new Error('Failed to create news item')
      }

      router.push('/admin/dashboard')
    } catch (err) {
      setError('Failed to create news item. Please try again.')
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', {
        method: 'POST',
      })
      router.push('/admin/login')
    } catch (err) {
      setError('Logout failed')
    }
  }

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="admin-layout">
      <nav className="admin-topnav">
        <div className="topnav-header">
          <h2>Awaken Admin</h2>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <ul className="topnav-nav">
          <li className="topnav-nav-item">
            <Link href="/admin/dashboard" className="topnav-nav-link">
              Dashboard
            </Link>
          </li>
          
          <div className="topnav-section">
            <div className="topnav-section-title">News Categories</div>
            <li className="topnav-nav-item">
              <Link href="/admin/dashboard" className="topnav-nav-link">
                All
              </Link>
            </li>
            <li className="topnav-nav-item">
              <Link href="/admin/dashboard?filter=event" className="topnav-nav-link">
                Events
              </Link>
            </li>
            <li className="topnav-nav-item">
              <Link href="/admin/dashboard?filter=workshop" className="topnav-nav-link">
                Workshops
              </Link>
            </li>
            <li className="topnav-nav-item">
              <Link href="/admin/dashboard?filter=achievement" className="topnav-nav-link">
                Achievements
              </Link>
            </li>
          </div>
        </ul>
      </nav>

      <main className="admin-main">
        <div className="news-form-container">
          <div className="form-header">
            <h1>Add News Item</h1>
            <Link href="/admin/dashboard" className="back-button">
              Back to Dashboard
            </Link>
          </div>

          {error && <div className="form-error">{error}</div>}

          <form onSubmit={handleSubmit} className="news-form">
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="event">Event</option>
                <option value="workshop">Workshop</option>
                <option value="achievement">Achievement</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
              {formData.imagePreview && (
                <div className="image-preview">
                  <img src={formData.imagePreview} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="cancel-button"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save News Item'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
} 