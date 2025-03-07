import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = cookies()
    
    // Remove the auth cookie
    cookieStore.delete('admin_auth')

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
} 