import { useState, useRef } from 'react'

export default function UploadScreen({ onFileLoaded }) {
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef(null)

  function handleDrop(e) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) onFileLoaded(file)
  }

  function handleDragOver(e) {
    e.preventDefault()
    setDragOver(true)
  }

  function handleDragLeave() {
    setDragOver(false)
  }

  function handleClick() {
    inputRef.current.click()
  }

  function handleChange(e) {
    const file = e.target.files[0]
    if (file) onFileLoaded(file)
  }

  return (
    <div className="upload-screen">
      <div
        className={`upload-zone${dragOver ? ' drag-over' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <div className="upload-icon">&#128196;</div>
        <h2>Excel Explorer</h2>
        <p>Drop an Excel file here or click to browse</p>
        <button className="btn btn-primary">Choose File</button>
        <input
          ref={inputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
