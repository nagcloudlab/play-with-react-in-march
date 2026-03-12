import { useState, useEffect } from 'react'
import {
  MemoryRouter, Routes, Route, Link, useParams, useLocation,
} from 'react-router-dom'

const fakePosts = [
  { id: 1, title: 'Getting Started with React Router', body: 'React Router is the most popular routing library for React. It enables client-side routing with declarative components...' },
  { id: 2, title: 'Understanding useParams', body: 'The useParams hook returns an object of key/value pairs from the current URL that match the dynamic segments of the route...' },
  { id: 3, title: 'Nested Routes Explained', body: 'Nested routes allow you to render child components inside parent layouts using the Outlet component...' },
  { id: 4, title: 'Error Boundaries in React', body: 'Error boundaries catch JavaScript errors in their child component tree and display a fallback UI instead of crashing...' },
]

function LocationBadge() {
  const location = useLocation()
  return (
    <span className="badge bg-dark font-monospace fs-6">
      {location.pathname}
    </span>
  )
}

function PostList() {
  return (
    <div className="list-group">
      {fakePosts.map(post => (
        <Link
          key={post.id}
          to={`/posts/${post.id}`}
          className="list-group-item list-group-item-action"
        >
          <strong>{post.title}</strong>
          <br />
          <small className="text-muted">{post.body.slice(0, 60)}...</small>
        </Link>
      ))}
    </div>
  )
}

function PostDetail() {
  const { postId } = useParams()
  const [currentId, setCurrentId] = useState(postId)
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Reset states at render time when postId changes (avoids setState in effect)
  if (postId !== currentId) {
    setCurrentId(postId)
    setPost(null)
    setLoading(true)
    setError(null)
  }

  useEffect(() => {
    let cancelled = false

    const delay = 800 + Math.random() * 700
    const timer = setTimeout(() => {
      if (cancelled) return

      const found = fakePosts.find(p => p.id === Number(postId))
      if (found) {
        setPost(found)
      } else {
        setError(`Post with id "${postId}" not found`)
      }
      setLoading(false)
    }, delay)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [postId])

  return (
    <div>
      <Link to="/" className="btn btn-sm btn-outline-secondary mb-3">&larr; All Posts</Link>

      {loading && (
        <div className="text-center py-4">
          <div className="spinner-border spinner-border-sm text-primary me-2" role="status" />
          <span className="text-muted">Loading post #{postId}...</span>
          <div className="mt-2">
            <small className="text-muted font-monospace">
              useEffect cleanup prevents stale updates if you navigate away
            </small>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {post && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
            <div className="bg-light p-2 rounded font-monospace small">
              useParams() = {JSON.stringify({ postId })}
            </div>
          </div>
        </div>
      )}
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
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
      </Routes>
    </div>
  )
}

export default function DataLoadingDemo() {
  const [key, setKey] = useState(0)

  return (
    <div>
      <h2>Data Loading</h2>
      <p className="lead">
        Combine useParams with useEffect to fetch data when route parameters change.
      </p>

      <ul>
        <li>Read the param with <strong>useParams()</strong>, then fetch in <strong>useEffect</strong></li>
        <li>Include the param in the effect&apos;s dependency array so it re-fetches on navigation</li>
        <li>Track three states: <code>loading</code>, <code>error</code>, and <code>data</code></li>
        <li>Return a <strong>cleanup function</strong> to cancel stale requests when the user navigates away</li>
        <li>Reset all states at the start of each fetch to avoid showing stale data</li>
      </ul>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Blog Posts — Fetch with Loading States</span>
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

      <code className="snippet">{`function PostDetail() {
  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(\`/api/posts/\${postId}\`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setPost(data)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [postId])
}`}</code>
    </div>
  )
}
