import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// In a real application, you would use a database and proper authentication
// This is a simplified example for demonstration purposes
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'password123'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Simple authentication check
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Set a cookie to maintain session
      const cookieStore = cookies()
      cookieStore.set('admin_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
} 