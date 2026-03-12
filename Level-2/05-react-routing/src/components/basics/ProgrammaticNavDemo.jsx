import { useState } from 'react'
import {
  MemoryRouter, Routes, Route, useNavigate, useLocation,
} from 'react-router-dom'

function LocationBadge() {
  const location = useLocation()
  return (
    <span className="badge bg-dark font-monospace fs-6">
      {location.pathname}
    </span>
  )
}

function HistoryTracker() {
  const location = useLocation()
  const [history, setHistory] = useState(['/login'])

  const [prevPath, setPrevPath] = useState(location.pathname)
  if (location.pathname !== prevPath) {
    setPrevPath(location.pathname)
    setHistory(h => [...h, location.pathname])
  }

  return (
    <div className="mt-3 bg-light p-2 rounded">
      <small className="text-muted d-block mb-1">Navigation history:</small>
      <div className="d-flex flex-wrap gap-1">
        {history.map((p, i) => (
          <span key={i} className={`badge ${i === history.length - 1 ? 'bg-primary' : 'bg-secondary'}`}>
            {p}
          </span>
        ))}
      </div>
      <small className="text-muted d-block mt-1">
        state: {JSON.stringify(location.state)}
      </small>
    </div>
  )
}

function LoginPage() {
  const [name, setName] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (name.trim()) {
      navigate('/welcome', { state: { username: name.trim() } })
    }
  }

  return (
    <div>
      <h5>Login</h5>
      <form onSubmit={handleLogin} className="d-flex gap-2">
        <input
          className="form-control form-control-sm"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ maxWidth: 200 }}
        />
        <button className="btn btn-primary btn-sm" type="submit">Login</button>
      </form>
    </div>
  )
}

function WelcomePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const username = location.state?.username || 'Guest'

  return (
    <div>
      <h5>Welcome, {username}!</h5>
      <p className="text-muted">You were navigated here programmatically with state.</p>
      <div className="d-flex gap-2">
        <button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/profile')}>
          Go to Profile
        </button>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <button className="btn btn-outline-warning btn-sm" onClick={() => navigate('/login', { replace: true })}>
          Logout (replace)
        </button>
      </div>
    </div>
  )
}

function ProfilePage() {
  const navigate = useNavigate()
  return (
    <div>
      <h5>Profile</h5>
      <p className="text-muted">Your profile page.</p>
      <button className="btn btn-outline-secondary btn-sm" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  )
}

function SandboxApp() {
  return (
    <div>
      <div className="mb-3">
        <span className="text-muted me-2">URL:</span>
        <LocationBadge />
      </div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      <HistoryTracker />
    </div>
  )
}

export default function ProgrammaticNavDemo() {
  const [key, setKey] = useState(0)

  return (
    <div>
      <h2>Programmatic Navigation</h2>
      <p className="lead">
        useNavigate lets you navigate in response to events like form submissions or button clicks.
      </p>

      <ul>
        <li><strong>useNavigate()</strong> returns a function: <code>navigate(path, options)</code></li>
        <li>Pass a path string to navigate to a new URL: <code>navigate(&apos;/welcome&apos;)</code></li>
        <li>Use <code>{`{ replace: true }`}</code> to replace the current history entry instead of pushing</li>
        <li>Pass <code>{`{ state: { ... } }`}</code> to send data without putting it in the URL</li>
        <li>Use <code>navigate(-1)</code> to go back, <code>navigate(1)</code> to go forward</li>
      </ul>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Login Flow with navigate() + state</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setKey(k => k + 1)}
          >
            Reset
          </button>
        </div>
        <div className="card-body">
          {/* <MemoryRouter key={key} initialEntries={['/login']}> */}
          <SandboxApp />
          {/* </MemoryRouter> */}
        </div>
      </div>

      <code className="snippet">{`const navigate = useNavigate()

// Navigate with state
navigate('/welcome', { state: { username: 'Alice' } })

// Replace (don't add to history)
navigate('/login', { replace: true })

// Go back
navigate(-1)`}</code>
    </div>
  )
}
