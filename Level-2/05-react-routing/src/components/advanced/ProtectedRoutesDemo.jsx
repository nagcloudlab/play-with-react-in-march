import { useState, createContext, useContext } from 'react'
import {
  MemoryRouter, Routes, Route, Link, NavLink, Navigate, useLocation,
} from 'react-router-dom'

const AuthContext = createContext(null)

function useAuth() {
  return useContext(AuthContext)
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (username, role) => setUser({ username, role })
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function RequireAuth({ children, requiredRole }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="alert alert-danger">
        Access denied. You need <strong>{requiredRole}</strong> role.
        Your role: <strong>{user.role}</strong>.
      </div>
    )
  }

  return children
}

function LocationBadge() {
  const location = useLocation()
  return (
    <span className="badge bg-dark font-monospace fs-6">
      {location.pathname}
    </span>
  )
}

function LoginPage() {
  const { login } = useAuth()
  const location = useLocation()
  const from = location.state?.from || '/dashboard'

  return (
    <div>
      <h5>Login</h5>
      <p className="text-muted">Redirected from: <code>{from}</code></p>
      <div className="d-flex gap-2">
        <button className="btn btn-primary btn-sm" onClick={() => login('Alice', 'user')}>
          Login as User
        </button>
        <button className="btn btn-warning btn-sm" onClick={() => login('Admin', 'admin')}>
          Login as Admin
        </button>
      </div>
    </div>
  )
}

function PublicPage() {
  return <div className="p-3 bg-light rounded">This page is public — anyone can see it.</div>
}

function DashboardPage() {
  const { user } = useAuth()
  return (
    <div className="p-3 bg-light rounded">
      Welcome to your dashboard, <strong>{user.username}</strong>!
    </div>
  )
}

function AdminPage() {
  return (
    <div className="p-3 bg-light rounded">
      Admin panel — only admins can see this.
    </div>
  )
}

function SandboxApp() {
  const { user, logout } = useAuth()

  return (
    <div>
      <div className="d-flex align-items-center gap-3 mb-3">
        <span className="text-muted">URL:</span>
        <LocationBadge />
        {user && (
          <span className="badge bg-success">
            {user.username} ({user.role})
          </span>
        )}
      </div>

      <div className="d-flex gap-2 mb-3">
        <NavLink to="/public" className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}>
          Public
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}>
          Dashboard
        </NavLink>
        <NavLink to="/admin" className={({ isActive }) => `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`}>
          Admin
        </NavLink>
        {user ? (
          <button className="btn btn-sm btn-outline-danger" onClick={logout}>Logout</button>
        ) : (
          <Link to="/login" className="btn btn-sm btn-outline-secondary">Login</Link>
        )}
      </div>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/public" element={<PublicPage />} />
        <Route path="/dashboard" element={
          <RequireAuth><DashboardPage /></RequireAuth>
        } />
        <Route path="/admin" element={
          <RequireAuth requiredRole="admin"><AdminPage /></RequireAuth>
        } />
        <Route path="*" element={<PublicPage />} />
      </Routes>
    </div>
  )
}

export default function ProtectedRoutesDemo() {
  const [key, setKey] = useState(0)

  return (
    <div>
      <h2>Protected Routes</h2>
      <p className="lead">
        Protect routes by wrapping them in a guard component that checks auth before rendering.
      </p>

      <ul>
        <li>Create a <strong>RequireAuth</strong> wrapper that checks if the user is logged in</li>
        <li>Use <code>&lt;Navigate to=&quot;/login&quot; replace /&gt;</code> to redirect unauthenticated users</li>
        <li>Pass <code>state={`{{ from: location.pathname }}`}</code> so login can redirect back</li>
        <li>Add role-based access by checking <code>user.role</code> in the guard</li>
        <li>Keep auth state in Context so all components can access it</li>
      </ul>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Auth Flow — Public / Protected / Admin</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setKey(k => k + 1)}
          >
            Reset
          </button>
        </div>
        <div className="card-body">
          <MemoryRouter key={key} initialEntries={['/public']}>
            <AuthProvider>
              <SandboxApp />
            </AuthProvider>
          </MemoryRouter>
        </div>
      </div>

      <code className="snippet">{`function RequireAuth({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

<Route path="/dashboard" element={
  <RequireAuth><Dashboard /></RequireAuth>
} />`}</code>
    </div>
  )
}
