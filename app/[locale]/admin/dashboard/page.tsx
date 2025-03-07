'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import './dashboard.css'

type NewsItem = {
  id: string
  type: 'event' | 'workshop' | 'achievement'
  title: string
  date: string
  description: string
  imageUrl: string
}

export default function AdminDashboard() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get filter from URL query parameter or default to 'all'
  const urlFilter = searchParams.get('filter') as 'event' | 'workshop' | 'achievement' | null
  const [filter, setFilter] = useState<'all' | 'event' | 'workshop' | 'achievement'>(
    urlFilter && ['event', 'workshop', 'achievement'].includes(urlFilter) ? urlFilter : 'all'
  )

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth')
        if (!response.ok) {
          router.push('/admin/login')
        }
      } catch (err) {
        router.push('/admin/login')
      }
    }

    checkAuth()

    // Fetch news items
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setNewsItems(data)
        setIsLoading(false)
      } catch (err) {
        setError('Failed to load news items')
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [router])

  // Update URL when filter changes
  useEffect(() => {
    if (filter === 'all') {
      router.push('/admin/dashboard')
    } else {
      router.push(`/admin/dashboard?filter=${filter}`)
    }
  }, [filter, router])

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`/api/news/${id}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          setNewsItems(newsItems.filter(item => item.id !== id))
        } else {
          setError('Failed to delete item')
        }
      } catch (err) {
        setError('An error occurred')
      }
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

  const filteredNews = newsItems.filter(item => 
    filter === 'all' || item.type === filter
  )

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <nav className="admin-topnav">
        <div className="topnav-header">
          <h2>Awaken Admin</h2>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <ul className="topnav-nav">
          <li className="topnav-nav-item">
            <Link href="/admin/dashboard" className="topnav-nav-link active">
              Dashboard
            </Link>
          </li>
          
          <div className="topnav-section">
            <div className="topnav-section-title">News Categories</div>
            <li className="topnav-nav-item">
              <button 
                onClick={() => setFilter('all')} 
                className={`topnav-nav-link ${filter === 'all' ? 'active' : ''}`}
              >
                All
              </button>
            </li>
            <li className="topnav-nav-item">
              <button 
                onClick={() => setFilter('event')} 
                className={`topnav-nav-link ${filter === 'event' ? 'active' : ''}`}
              >
                Events
              </button>
            </li>
            <li className="topnav-nav-item">
              <button 
                onClick={() => setFilter('workshop')} 
                className={`topnav-nav-link ${filter === 'workshop' ? 'active' : ''}`}
              >
                Workshops
              </button>
            </li>
            <li className="topnav-nav-item">
              <button 
                onClick={() => setFilter('achievement')} 
                className={`topnav-nav-link ${filter === 'achievement' ? 'active' : ''}`}
              >
                Achievements
              </button>
            </li>
          </div>
        </ul>
      </nav>

      <main className="admin-main">
        <header className="admin-header">
          <h1>News Management Dashboard</h1>
          <div className="admin-actions">
            <Link href="/admin/news/create" className="add-button">
              Add New Item
            </Link>
          </div>
        </header>

        {error && <div className="admin-error">{error}</div>}

        <div className="news-table-container">
          <table className="news-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Type</th>
                <th>Title</th>
                <th>Date</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNews.length === 0 ? (
                <tr>
                  <td colSpan={6} className="no-items">
                    No news items found. Add your first one!
                  </td>
                </tr>
              ) : (
                filteredNews.map(item => (
                  <tr key={item.id}>
                    <td className="image-cell">
                      <div className="table-image-container">
                        <Image 
                          src={item.imageUrl} 
                          alt={item.title} 
                          width={80} 
                          height={60} 
                          className="table-image" 
                        />
                      </div>
                    </td>
                    <td>{item.type}</td>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td className="description-cell">{item.description}</td>
                    <td className="actions-cell">
                      <Link href={`/admin/news/edit/${item.id}`} className="edit-button">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
} 