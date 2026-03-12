import { useState, Component } from 'react'
import {
  MemoryRouter, Routes, Route, Link, useLocation, useNavigate,
} from 'react-router-dom'

function LocationBadge() {
  const location = useLocation()
  return (
    <span className="badge bg-dark font-monospace fs-6">
      {location.pathname}
    </span>
  )
}

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger">
          <h5>Something went wrong!</h5>
          <p className="mb-2 font-monospace small">{this.state.error?.message}</p>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function HomePage() {
  return <div className="p-3 bg-light rounded">Welcome to the home page!</div>
}

function AboutPage() {
  return <div className="p-3 bg-light rounded">Learn more about us on this page.</div>
}

function BuggyPage() {
  throw new Error('This component intentionally throws to demo error boundaries!')
}

function NotFoundPage() {
  const location = useLocation()
  return (
    <div className="text-center py-4">
      <h3 className="text-muted">404</h3>
      <p>No route matches <code>{location.pathname}</code></p>
      <Link to="/" className="btn btn-primary btn-sm">Go Home</Link>
    </div>
  )
}

function UrlTester() {
  const [input, setInput] = useState('')
  const navigate = useNavigate()

  const go = (e) => {
    e.preventDefault()
    const path = input.startsWith('/') ? input : `/${input}`
    navigate(path)
    setInput('')
  }

  return (
    <form onSubmit={go} className="d-flex gap-2 mb-3">
      <input
        className="form-control form-control-sm"
        placeholder="Type a path (e.g. /about, /xyz)"
        value={input}
        onChange={e => setInput(e.target.value)}
        style={{ maxWidth: 280 }}
      />
      <button className="btn btn-primary btn-sm" type="submit">Go</button>
    </form>
  )
}

function SandboxApp() {
  return (
    <div>
      <div className="mb-3">
        <span className="text-muted me-2">URL:</span>
        <LocationBadge />
      </div>

      <div className="d-flex gap-2 mb-3">
        <Link to="/" className="btn btn-outline-primary btn-sm">Home</Link>
        <Link to="/about" className="btn btn-outline-primary btn-sm">About</Link>
        <Link to="/buggy" className="btn btn-outline-danger btn-sm">Buggy Page</Link>
        <Link to="/nothing" className="btn btn-outline-secondary btn-sm">/nothing (404)</Link>
      </div>

      <UrlTester />

      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/buggy" element={<BuggyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default function ErrorHandlingDemo() {
  const [key, setKey] = useState(0)

  return (
    <div>
      <h2>Error Handling &amp; 404</h2>
      <p className="lead">
        Catch-all routes handle unknown URLs, and error boundaries catch render errors.
      </p>

      <ul>
        <li><code>path=&quot;*&quot;</code> matches any URL that no other route matched — perfect for 404 pages</li>
        <li>The <code>*</code> route should be the last child inside <code>&lt;Routes&gt;</code></li>
        <li><strong>Error boundaries</strong> (class components) catch errors thrown during rendering</li>
        <li>Wrap routes in an error boundary so one broken page doesn&apos;t crash the whole app</li>
        <li>Provide a &quot;Try Again&quot; button that resets the error boundary state</li>
      </ul>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>404 Catch-All + Error Boundary</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setKey(k => k + 1)}
          >
            Reset
          </button>
        </div>
        <div className="card-body">
          <MemoryRouter key={key}>
            <SandboxApp />
          </MemoryRouter>
        </div>
      </div>

      <code className="snippet">{`<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="*" element={<NotFound />} />  {/* catch-all */}
</Routes>

// Error boundary wraps routes:
<ErrorBoundary fallback={<ErrorPage />}>
  <Routes>...</Routes>
</ErrorBoundary>`}</code>
    </div>
  )
}
