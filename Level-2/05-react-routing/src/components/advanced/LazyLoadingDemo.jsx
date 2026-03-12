import { useState, useEffect, Suspense } from 'react'
import {
  MemoryRouter, Routes, Route, NavLink, useLocation,
} from 'react-router-dom'

function LocationBadge() {
  const location = useLocation()
  return (
    <span className="badge bg-dark font-monospace fs-6">
      {location.pathname}
    </span>
  )
}

function LoadingSpinner({ label }) {
  return (
    <div className="text-center py-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted mt-2">Loading {label}...</p>
    </div>
  )
}

function createFakeLazyComponent(name, color, delay) {
  let loaded = false
  let component = null
  let loadPromise = null

  function LazyWrapper() {
    const [, setTick] = useState(0)

    useEffect(() => {
      if (!loaded && !loadPromise) {
        loadPromise = new Promise(resolve => {
          setTimeout(() => {
            loaded = true
            component = () => (
              <div className={`p-3 bg-${color}-subtle border border-${color} rounded`}>
                <h5>{name} Page</h5>
                <p className="mb-0 text-muted">
                  Loaded after {delay}ms delay (simulating lazy import).
                </p>
              </div>
            )
            resolve()
          }, delay)
        })
      }

      if (!loaded) {
        loadPromise.then(() => setTick(t => t + 1))
      }
    }, [setTick])

    if (!loaded) {
      return <LoadingSpinner label={name} />
    }

    const Component = component
    return <Component />
  }

  LazyWrapper.displayName = `FakeLazy(${name})`
  return LazyWrapper
}

function TimelineEntry({ name, delay, status }) {
  return (
    <div className="d-flex align-items-center gap-2 mb-1">
      <div style={{ width: 80 }}><small className="font-monospace">{delay}ms</small></div>
      <div className="progress flex-fill" style={{ height: 20 }}>
        <div
          className={`progress-bar ${status === 'loaded' ? 'bg-success' : 'bg-warning progress-bar-striped progress-bar-animated'}`}
          style={{ width: status === 'loaded' ? '100%' : '60%' }}
        >
          {name}
        </div>
      </div>
      <span className={`badge ${status === 'loaded' ? 'bg-success' : 'bg-warning'}`}>
        {status}
      </span>
    </div>
  )
}

const FakeLazyHome = createFakeLazyComponent('Home', 'primary', 500)
const FakeLazyAnalytics = createFakeLazyComponent('Analytics', 'success', 1500)
const FakeLazyReports = createFakeLazyComponent('Reports', 'warning', 2500)

const routeConfig = [
  { path: '/home', name: 'Home', delay: 500, Component: FakeLazyHome },
  { path: '/analytics', name: 'Analytics', delay: 1500, Component: FakeLazyAnalytics },
  { path: '/reports', name: 'Reports', delay: 2500, Component: FakeLazyReports },
]

function SandboxApp() {
  const [loadStatuses, setLoadStatuses] = useState({
    Home: 'pending',
    Analytics: 'pending',
    Reports: 'pending',
  })

  useEffect(() => {
    routeConfig.forEach(({ name, delay }) => {
      setTimeout(() => {
        setLoadStatuses(prev => ({ ...prev, [name]: 'loaded' }))
      }, delay)
    })
  }, [])

  return (
    <div>
      <div className="mb-3">
        <span className="text-muted me-2">URL:</span>
        <LocationBadge />
      </div>

      <div className="d-flex gap-2 mb-3">
        {routeConfig.map(r => (
          <NavLink
            key={r.path}
            to={r.path}
            className={({ isActive }) =>
              `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
            }
          >
            {r.name}
          </NavLink>
        ))}
      </div>

      <Suspense fallback={<LoadingSpinner label="page" />}>
        <Routes>
          {routeConfig.map(r => (
            <Route key={r.path} path={r.path} element={<r.Component />} />
          ))}
          <Route path="*" element={
            <p className="text-muted">Click a tab above to load a lazy route.</p>
          } />
        </Routes>
      </Suspense>

      <div className="mt-4">
        <h6>Load Timeline</h6>
        {routeConfig.map(r => (
          <TimelineEntry
            key={r.name}
            name={r.name}
            delay={r.delay}
            status={loadStatuses[r.name]}
          />
        ))}
      </div>
    </div>
  )
}

export default function LazyLoadingDemo() {
  const [key, setKey] = useState(0)

  return (
    <div>
      <h2>Lazy Loading Routes</h2>
      <p className="lead">
        Code splitting with React.lazy loads route components only when they are needed.
      </p>

      <ul>
        <li><strong>React.lazy()</strong> accepts a function that returns a dynamic <code>import()</code></li>
        <li>Wrap lazy routes in <strong>&lt;Suspense&gt;</strong> with a <code>fallback</code> for loading UI</li>
        <li>Each lazy component creates a separate JS chunk — only downloaded when the route is visited</li>
        <li>This reduces initial bundle size, especially for large apps with many pages</li>
        <li>The demo below simulates lazy loading with fake delays to visualize the timeline</li>
      </ul>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Fake-Lazy Routes with Load Timeline</span>
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

      <code className="snippet">{`const LazyDashboard = React.lazy(() => import('./Dashboard'))
const LazySettings = React.lazy(() => import('./Settings'))

<Suspense fallback={<Spinner />}>
  <Routes>
    <Route path="/dashboard" element={<LazyDashboard />} />
    <Route path="/settings" element={<LazySettings />} />
  </Routes>
</Suspense>`}</code>
    </div>
  )
}
