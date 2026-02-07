import { useState, type ChangeEvent } from 'react'
import './App.css'

function App() {
  // We tell React: "This variable can be a string (URL) or null (empty)"
  const [image, setImage] = useState<string | null>(null)

  // We tell React: "This event comes from an HTML Input element"
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Check if files exist
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      
      // Create the fake URL
      const url = URL.createObjectURL(file)
      setImage(url)
    }
  }

  return (
    <div className="container">
      <h1>📷 My Camera App</h1>
      
      <div className="card">
        {/* Hidden Input */}
        <input 
          type="file" 
          accept="image/*" 
          capture="environment"
          onChange={handleImageChange}
          id="cameraInput"
          style={{ display: 'none' }} 
        />

        {/* Custom Button */}
        <label htmlFor="cameraInput" className="camera-button">
          Open Camera
        </label>
      </div>

      {/* Image Preview */}
      {image && (
        <div className="preview-area">
          <h3>Your Photo:</h3>
          <img src={image} alt="Captured" className="photo-preview" />
        </div>
      )}
    </div>
  )
}

export default App