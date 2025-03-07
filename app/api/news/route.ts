import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'

// In a real application, you would use a database
// This is a simplified example using a JSON file for demonstration
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'news.json')

// Ensure the data directory exists
const ensureDataDir = () => {
  const dataDir = path.join(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
  
  if (!fs.existsSync(DATA_FILE_PATH)) {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify([]))
  }
}

// Get all news items
export async function GET() {
  try {
    ensureDataDir()
    
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8')
    const newsItems = JSON.parse(data)
    
    return NextResponse.json(newsItems)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news items' },
      { status: 500 }
    )
  }
}

// Create a new news item
export async function POST(request: Request) {
  try {
    // Check authentication
    const cookieStore = cookies()
    const authCookie = cookieStore.get('admin_auth')
    
    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    ensureDataDir()
    
    // This is a simplified example
    // In a real application, you would handle file uploads properly
    // and store them in a cloud storage service
    const formData = await request.formData()
    const type = formData.get('type') as string
    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const description = formData.get('description') as string
    const image = formData.get('image') as File
    
    // Generate a unique ID for the news item
    const id = uuidv4()
    
    // Save the image to the public directory
    const imageExt = image.name.split('.').pop()
    const imageName = `${id}.${imageExt}`
    const imagePath = `/images/${imageName}`
    
    // Ensure the images directory exists
    const imagesDir = path.join(process.cwd(), 'public', 'images')
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true })
    }
    
    // Save the image
    const imageBuffer = Buffer.from(await image.arrayBuffer())
    fs.writeFileSync(path.join(imagesDir, imageName), imageBuffer)
    
    // Create the news item
    const newsItem = {
      id,
      type,
      title,
      date,
      description,
      imageUrl: imagePath,
    }
    
    // Read existing news items
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8')
    const newsItems = JSON.parse(data)
    
    // Add the new item
    newsItems.push(newsItem)
    
    // Save the updated list
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(newsItems, null, 2))
    
    return NextResponse.json(newsItem)
  } catch (error) {
    console.error('Error creating news item:', error)
    return NextResponse.json(
      { error: 'Failed to create news item' },
      { status: 500 }
    )
  }
} 