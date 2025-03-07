'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import './admin.css'

export default function AdminRedirect() {
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
          // If not authenticated, redirect to login
          router.push('/admin/login')
        }
      } catch (err) {
        // On error, redirect to login
        router.push('/admin/login')
      }
    }

    checkAuth()
  }, [router])

  // Show loading state while redirecting
  return (
    <div className="admin-loading">
      <div className="spinner"></div>
      <p>Redirecting...</p>
    </div>
  )
} 