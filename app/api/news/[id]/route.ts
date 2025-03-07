import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import fs from 'fs'
import path from 'path'

// In a real application, you would use a database
// This is a simplified example using a JSON file for demonstration
const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'news.json')

// Get a specific news item
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    // Read the news items
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8')
    const newsItems = JSON.parse(data)
    
    // Find the specific item
    const newsItem = newsItems.find((item: any) => item.id === id)
    
    if (!newsItem) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(newsItem)
  } catch (error) {
    console.error('Error fetching news item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news item' },
      { status: 500 }
    )
  }
}

// Update a news item
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    
    const { id } = params
    
    // Read the news items
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8')
    const newsItems = JSON.parse(data)
    
    // Find the index of the item to update
    const itemIndex = newsItems.findIndex((item: any) => item.id === id)
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404 }
      )
    }
    
    const formData = await request.formData()
    const type = formData.get('type') as string
    const title = formData.get('title') as string
    const date = formData.get('date') as string
    const description = formData.get('description') as string
    const image = formData.get('image') as File | null
    
    // Get the existing item
    const existingItem = newsItems[itemIndex]
    
    // Update the item
    const updatedItem = {
      ...existingItem,
      type,
      title,
      date,
      description,
    }
    
    // Handle image update if a new image was provided
    if (image) {
      // Delete the old image if it exists
      if (existingItem.imageUrl) {
        const oldImageName = path.basename(existingItem.imageUrl)
        const oldImagePath = path.join(process.cwd(), 'public', 'images', oldImageName)
        
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath)
        }
      }
      
      // Save the new image
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
      
      // Update the image URL
      updatedItem.imageUrl = imagePath
    }
    
    // Update the item in the array
    newsItems[itemIndex] = updatedItem
    
    // Save the updated list
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(newsItems, null, 2))
    
    return NextResponse.json(updatedItem)
  } catch (error) {
    console.error('Error updating news item:', error)
    return NextResponse.json(
      { error: 'Failed to update news item' },
      { status: 500 }
    )
  }
}

// Delete a news item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    
    const { id } = params
    
    // Read the news items
    const data = fs.readFileSync(DATA_FILE_PATH, 'utf8')
    const newsItems = JSON.parse(data)
    
    // Find the index of the item to delete
    const itemIndex = newsItems.findIndex((item: any) => item.id === id)
    
    if (itemIndex === -1) {
      return NextResponse.json(
        { error: 'News item not found' },
        { status: 404 }
      )
    }
    
    // Get the item to delete
    const itemToDelete = newsItems[itemIndex]
    
    // Delete the image if it exists
    if (itemToDelete.imageUrl) {
      const imageName = path.basename(itemToDelete.imageUrl)
      const imagePath = path.join(process.cwd(), 'public', 'images', imageName)
      
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }
    
    // Remove the item from the array
    newsItems.splice(itemIndex, 1)
    
    // Save the updated list
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(newsItems, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting news item:', error)
    return NextResponse.json(
      { error: 'Failed to delete news item' },
      { status: 500 }
    )
  }
} 