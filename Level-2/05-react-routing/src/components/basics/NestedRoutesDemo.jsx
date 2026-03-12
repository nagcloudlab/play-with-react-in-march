import { useState } from 'react'
import {
  MemoryRouter, Routes, Route, NavLink, Outlet, useLocation,
} from 'react-router-dom'

function LocationBadge() {
  const location = useLocation()
  return (
    <span className="badge bg-dark font-monospace fs-6">
      {location.pathname}
    </span>
  )
}

function DashboardLayout() {
  return (
    <div>
      <h5 className="mb-3">Dashboard</h5>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <NavLink to="/nested-routes/dashboard" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Overview
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/nested-routes/dashboard/stats" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Stats
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/dashboard/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Settings
          </NavLink>
        </li>
      </ul>

      <div className="border rounded p-3 bg-white">
        <Outlet />
      </div>
    </div>
  )
}

function Overview() {
  return (
    <div>
      <h6>Overview (index route)</h6>
      <p className="text-muted mb-0">This is the default child — rendered when URL is exactly <code>/dashboard</code>.</p>
    </div>
  )
}

function Stats() {
  return (
    <div>
      <h6>Stats</h6>
      <div className="d-flex gap-3">
        <div className="card card-body py-2 text-center flex-fill">
          <div className="fs-4 fw-bold text-primary">1,234</div>
          <small className="text-muted">Visitors</small>
        </div>
        <div className="card card-body py-2 text-center flex-fill">
          <div className="fs-4 fw-bold text-success">567</div>
          <small className="text-muted">Orders</small>
        </div>
        <div className="card card-body py-2 text-center flex-fill">
          <div className="fs-4 fw-bold text-warning">89%</div>
          <small className="text-muted">Uptime</small>
        </div>
      </div>
    </div>
  )
}

function Settings() {
  return (
    <div>
      <h6>Settings</h6>
      <p className="text-muted mb-0">User preferences and configuration panel.</p>
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
        <Route path="/nested-routes/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="stats" element={<Stats />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={
          <div className="text-center">
            <NavLink to="/nested-routes/dashboard" className="btn btn-primary">Go to Dashboard</NavLink>
          </div>
        } />
      </Routes>
    </div>
  )
}

export default function NestedRoutesDemo() {
  const [key, setKey] = useState(0)

  return (
    <div>
      <h2>Nested Routes</h2>
      <p className="lead">
        Nested routes let a parent layout render shared UI while child routes fill in the content.
      </p>

      <ul>
        <li>Nest <code>&lt;Route&gt;</code> elements inside a parent Route to create child routes</li>
        <li>The parent renders an <strong>&lt;Outlet /&gt;</strong> where the matched child will appear</li>
        <li>Use <code>&lt;Route index&gt;</code> for the default child (when URL matches parent exactly)</li>
        <li>Child paths are relative — <code>stats</code> becomes <code>/dashboard/stats</code></li>
        <li>Layout routes let you wrap multiple pages with shared headers, tabs, or sidebars</li>
      </ul>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Dashboard with Tabs + Outlet</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setKey(k => k + 1)}
          >
            Reset
          </button>
        </div>
        <div className="card-body">
          {/* <MemoryRouter key={key} initialEntries={['/dashboard']}> */}
          <SandboxApp />
          {/* </MemoryRouter> */}
        </div>
      </div>

      <code className="snippet">{`<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="stats" element={<Stats />} />
  <Route path="settings" element={<Settings />} />
</Route>

function DashboardLayout() {
  return (
    <div>
      <nav>...</nav>
      <Outlet />  {/* child route renders here */}
    </div>
  )
}`}</code>
    </div>
  )
}
