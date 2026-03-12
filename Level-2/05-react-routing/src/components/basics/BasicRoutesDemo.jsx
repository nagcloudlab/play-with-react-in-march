import { useState } from 'react'
import { MemoryRouter, Routes, Route, Link, useLocation } from 'react-router-dom'

function LocationBadge() {
  const location = useLocation()
  return (
    <span className="badge bg-dark font-monospace fs-6">
      {location.pathname}
    </span>
  )
}

function HomePage() {
  return <div className="p-3 bg-light rounded">Welcome to the Home page!</div>
}

function AboutPage() {
  return <div className="p-3 bg-light rounded">This is the About page.</div>
}

function ContactPage() {
  return <div className="p-3 bg-light rounded">Get in touch on the Contact page.</div>
}

function SandboxApp() {
  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-3">
        <span className="text-muted">Current URL:</span>
        <LocationBadge />
      </div>

      <div className="d-flex gap-2 mb-3">
        <Link to="/basic-routes" className="btn btn-outline-primary btn-sm">Home</Link>
        <Link to="/basic-routes/about" className="btn btn-outline-primary btn-sm">About</Link>
        <Link to="/basic-routes/contact" className="btn btn-outline-primary btn-sm">Contact</Link>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

    </div>
  )
}

export default function BasicRoutesDemo() {
  const [key, setKey] = useState(0)

  return (
    <div>
      <h2>Basic Routes</h2>
      <p className="lead">
        Routes map URL paths to components — the foundation of any React Router app.
      </p>

      <ul>
        <li><strong>BrowserRouter</strong> wraps your app and enables client-side routing using the History API</li>
        <li><strong>Routes</strong> is a container that renders the first child Route whose path matches the URL</li>
        <li><strong>Route</strong> declares a mapping: <code>path</code> → <code>element</code></li>
        <li>Only one route renders at a time — React Router picks the best match</li>
        <li>Paths are matched from most specific to least specific, not top to bottom</li>
      </ul>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>MemoryRouter Sandbox</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setKey(k => k + 1)}
          >
            Reset
          </button>
        </div>
        <div className="card-body">
          {/* <MemoryRouter key={key}> */}
          <SandboxApp />
          {/* </MemoryRouter> */}
        </div>
      </div>

      <code className="snippet">{`<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</BrowserRouter>`}</code>
    </div>
  )
}
