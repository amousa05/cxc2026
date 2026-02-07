// src/components/CameraCapture.tsx
import { useState, type ChangeEvent } from 'react'
import './CameraCapture.css' // We will make this specifically for mobile styles

export default function CameraCapture() {
  const [image, setImage] = useState<string | null>(null)

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setImage(url)
    }
  }

  return (
    <div className="camera-container">
      {/* 1. The Image Preview Area (Takes up most space) */}
      <div className="image-area">
        {image ? (
          <img src={image} alt="Captured" className="photo-preview" />
        ) : (
          <div className="placeholder">
            <p>No Photo Yet 📷</p>
          </div>
        )}
      </div>

      {/* 2. The Controls Area (Sticks to bottom) */}
      <div className="controls-area">
        <input 
          type="file" 
          accept="image/*" 
          capture="environment"
          onChange={handleImageChange}
          id="cameraInput"
          style={{ display: 'none' }} 
        />
        
        <label htmlFor="cameraInput" className="camera-button">
          📸 Snap Photo
        </label>
      </div>
    </div>
  )
}