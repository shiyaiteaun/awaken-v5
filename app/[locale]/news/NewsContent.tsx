'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import './news.css'

type NewsItem = {
  id: string
  type: 'event' | 'workshop' | 'achievement'
  title: string
  date: string
  description: string
  imageUrl: string
}

type Translations = {
  title: string
  all: string
  events: string
  workshops: string
  achievements: string
}

const NewsContent = ({ translations }: { translations: Translations }) => {
  const [filter, setFilter] = useState<'all' | 'event' | 'workshop' | 'achievement'>('all')
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Fetch news items from the API
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
  }, [])

  const filteredNews = newsItems.filter((item) => filter === 'all' || item.type === filter)

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading news...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="news-container">
      <div className="container">
        <div className="news-header">
          <h1>{translations.title}</h1>
        </div>

        <div className="filter-buttons">
          <button
            onClick={() => setFilter('all')}
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
          >
            {translations.all}
          </button>
          <button
            onClick={() => setFilter('event')}
            className={`filter-button ${filter === 'event' ? 'active' : ''}`}
          >
            {translations.events}
          </button>
          <button
            onClick={() => setFilter('workshop')}
            className={`filter-button ${filter === 'workshop' ? 'active' : ''}`}
          >
            {translations.workshops}
          </button>
          <button
            onClick={() => setFilter('achievement')}
            className={`filter-button ${filter === 'achievement' ? 'active' : ''}`}
          >
            {translations.achievements}
          </button>
        </div>

        {filteredNews.length === 0 ? (
          <div className="no-news">
            <p>No news items found for this category.</p>
          </div>
        ) : (
          <div className="news-grid">
            {filteredNews.map((item) => (
              <div key={item.id} className="news-item">
                <div className="news-image-wrapper">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="news-image"
                  />
                </div>
                <div className="news-content">
                  <div className="news-type">
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                  </div>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-date">{item.date}</p>
                  <p className="news-description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsContent 