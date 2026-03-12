import { useState } from 'react'
import { MemoryRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom'

const users = [
  { id: '1', name: 'Alice', role: 'Engineer', email: 'alice@example.com' },
  { id: '2', name: 'Bob', role: 'Designer', email: 'bob@example.com' },
  { id: '3', name: 'Charlie', role: 'Manager', email: 'charlie@example.com' },
  { id: '4', name: 'Diana', role: 'DevOps', email: 'diana@example.com' },
]

function LocationBadge() {
  const location = useLocation()
  return (
    <span className="badge bg-dark font-monospace fs-6">
      {location.pathname}
    </span>
  )
}

function UserList() {
  return (
    <div className="row g-2">
      {users.map(u => (
        <div key={u.id} className="col-6">
          <Link to={`/dynamic-routes/users/${u.id}`} className="text-decoration-none">
            <div className="card card-body py-2 text-center">
              <strong>{u.name}</strong>
              <small className="text-muted">{u.role}</small>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

function UserDetail() {
  const params = useParams()
  const user = users.find(u => u.id === params.userId)

  return (
    <div>
      <Link to="/dynamic-routes" className="btn btn-sm btn-outline-secondary mb-3">&larr; Back</Link>

      {user ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="mb-1"><strong>Role:</strong> {user.role}</p>
            <p className="mb-3"><strong>Email:</strong> {user.email}</p>
            <div className="bg-light p-2 rounded font-monospace small">
              useParams() = {JSON.stringify(params, null, 2)}
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">User not found (id: {params.userId})</div>
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
        <Route path="/" element={<UserList />} />
        <Route path="/users/:userId" element={<UserDetail />} />
      </Routes>
    </div>
  )
}

export default function DynamicRoutesDemo() {
  const [key, setKey] = useState(0)

  return (
    <div>
      <h2>Dynamic Routes</h2>
      <p className="lead">
        Dynamic segments let a single route match many URLs with different parameters.
      </p>

      <ul>
        <li>Use <code>:paramName</code> in the path to create a dynamic segment: <code>/users/:userId</code></li>
        <li><strong>useParams()</strong> returns an object with all matched parameters</li>
        <li>You can have multiple params: <code>/teams/:teamId/members/:memberId</code></li>
        <li>Params are always strings — cast to number if needed</li>
        <li>Use the param value to fetch data, filter lists, or render conditionally</li>
      </ul>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>User Directory — Click a card</span>
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

      <code className="snippet">{`<Route path="/users/:userId" element={<UserDetail />} />

function UserDetail() {
  const { userId } = useParams()
  // userId is "1", "2", etc. — always a string
}`}</code>
    </div>
  )
}
