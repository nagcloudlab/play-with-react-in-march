import { useState, Suspense, lazy } from 'react'

function simulateLazy(componentFn) {
  return lazy(() =>
    new Promise(resolve =>
      setTimeout(() => resolve({ default: componentFn }), 1500)
    )
  )
}

function Dashboard() {
  return (
    <div className="card border-primary">
      <div className="card-body">
        <h5 className="text-primary">Dashboard</h5>
        <p>Welcome! Here are your stats: 42 orders, 128 users, $9,847 revenue.</p>
        <div className="d-flex gap-3">
          <span className="badge bg-primary fs-6">42 Orders</span>
          <span className="badge bg-success fs-6">128 Users</span>
          <span className="badge bg-warning text-dark fs-6">$9,847</span>
        </div>
      </div>
    </div>
  )
}

const analyticsData = [
  { day: 'Mon', width: 180 },
  { day: 'Tue', width: 120 },
  { day: 'Wed', width: 230 },
  { day: 'Thu', width: 90 },
  { day: 'Fri', width: 200 },
]

function Analytics() {
  return (
    <div className="card border-success">
      <div className="card-body">
        <h5 className="text-success">Analytics</h5>
        <p>Page views this week:</p>
        {analyticsData.map(({ day, width }) => (
          <div key={day} className="d-flex align-items-center gap-2 mb-1">
            <span style={{ width: 40 }}>{day}</span>
            <div
              className="bg-success"
              style={{
                height: 20,
                width,
                borderRadius: 4,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function Settings() {
  return (
    <div className="card border-warning">
      <div className="card-body">
        <h5 className="text-warning">Settings</h5>
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" defaultChecked readOnly />
          <label className="form-check-label">Email notifications</label>
        </div>
        <div className="form-check mb-2">
          <input className="form-check-input" type="checkbox" readOnly />
          <label className="form-check-label">Dark mode</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" defaultChecked readOnly />
          <label className="form-check-label">Auto-save</label>
        </div>
      </div>
    </div>
  )
}

// Module-level lazy wrappers for initial load
const LazyDashboard = simulateLazy(Dashboard)
const LazyAnalytics = simulateLazy(Analytics)
const LazySettings = simulateLazy(Settings)

const tabs = [
  { key: 'dashboard', label: 'Dashboard', color: 'primary' },
  { key: 'analytics', label: 'Analytics', color: 'success' },
  { key: 'settings', label: 'Settings', color: 'warning' },
]

export default function CodeSplittingDemo() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [lazyComponents, setLazyComponents] = useState({
    dashboard: LazyDashboard,
    analytics: LazyAnalytics,
    settings: LazySettings,
  })

  const ActiveTab = lazyComponents[activeTab]

  function handleReset() {
    setLazyComponents({
      dashboard: simulateLazy(Dashboard),
      analytics: simulateLazy(Analytics),
      settings: simulateLazy(Settings),
    })
  }

  return (
    <div>
      <h2>Code Splitting</h2>
      <ul>
        <li><code>React.lazy()</code> + <code>Suspense</code> lets you split your bundle and load components on demand.</li>
        <li>Each tab simulates a 1.5-second network delay to show the loading experience.</li>
        <li>Once loaded, switching back to a tab is instant (cached by React).</li>
        <li>The Reset button creates new lazy wrappers to simulate fresh loads.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex gap-2 mb-3">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`btn ${activeTab === tab.key ? `btn-${tab.color}` : `btn-outline-${tab.color}`}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
            <button className="btn btn-outline-secondary ms-auto" onClick={handleReset}>
              Reset (Re-simulate Load)
            </button>
          </div>

          <Suspense
            fallback={
              <div className="text-center py-5">
                <div className="spinner-border text-primary mb-2" role="status" />
                <p className="text-muted">Loading {activeTab}...</p>
              </div>
            }
          >
            <ActiveTab />
          </Suspense>
        </div>
      </div>

      <code className="snippet">{`const LazyDashboard = lazy(() => import('./Dashboard'))

<Suspense fallback={<Spinner />}>
  <LazyDashboard />
</Suspense>`}</code>
    </div>
  )
}
