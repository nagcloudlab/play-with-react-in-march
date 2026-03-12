import { useState, useTransition } from 'react'

const LARGE_LIST_SIZE = 10000
const allNames = Array.from({ length: LARGE_LIST_SIZE }, (_, i) => {
  const names = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Hank']
  return `${names[i % names.length]} #${i + 1}`
})

function filterNames(query) {
  if (!query) return allNames
  const lower = query.toLowerCase()
  return allNames.filter(n => n.toLowerCase().includes(lower))
}

export default function BatchingTransitionsDemo() {
  // Panel 1: Batching
  const [firstName, setFirstName] = useState('Jane')
  const [lastName, setLastName] = useState('Doe')
  const [age, setAge] = useState(25)
  const [batchLog, setBatchLog] = useState([])

  function handleUpdateAll() {
    const timestamp = new Date().toLocaleTimeString()
    setFirstName('John')
    setLastName('Smith')
    setAge(30)
    setBatchLog(prev => [
      `[${timestamp}] All 3 states updated → single render`,
      ...prev.slice(0, 4),
    ])
  }

  function handleReset() {
    setFirstName('Jane')
    setLastName('Doe')
    setAge(25)
  }

  // Panel 2: Transitions
  const [useTransitionEnabled, setUseTransitionEnabled] = useState(false)
  const [query, setQuery] = useState('')
  const [filteredQuery, setFilteredQuery] = useState('')
  const [isPending, startTransition] = useTransition()

  function handleFilter(value) {
    setQuery(value)
    if (useTransitionEnabled) {
      startTransition(() => {
        setFilteredQuery(value)
      })
    } else {
      setFilteredQuery(value)
    }
  }

  const filteredNames = filterNames(filteredQuery)

  return (
    <div>
      <h2>Batching & Transitions</h2>
      <ul>
        <li>React 18+ automatically batches multiple <code>setState</code> calls in event handlers into a single re-render.</li>
        <li><code>useTransition</code> marks state updates as low priority, keeping the UI responsive.</li>
        <li>Panel 1 demonstrates batching: three state updates, one render.</li>
        <li>Panel 2 compares filtering with and without <code>useTransition</code>.</li>
      </ul>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card border-primary h-100">
            <div className="card-body">
              <h5 className="text-primary">Panel 1: Automatic Batching</h5>
              <div className="mb-3">
                <p className="mb-1">
                  Current state: <strong>{firstName} {lastName}</strong>, age <strong>{age}</strong>
                </p>
                <p className="text-muted small mb-0">Rendered at: {new Date().toLocaleTimeString()}</p>
              </div>

              <div className="d-flex gap-2 mb-3">
                <button className="btn btn-primary" onClick={handleUpdateAll}>
                  Update All 3 States
                </button>
                <button className="btn btn-outline-secondary" onClick={handleReset}>
                  Reset
                </button>
              </div>

              <div>
                <h6>Render Log</h6>
                {batchLog.length === 0 ? (
                  <p className="text-muted small">Click "Update All" to see batching in action</p>
                ) : (
                  batchLog.map((log, i) => (
                    <div key={i} className="small text-success">{log}</div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card border-info h-100">
            <div className="card-body">
              <h5 className="text-info">Panel 2: useTransition</h5>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={useTransitionEnabled}
                  onChange={e => {
                    setUseTransitionEnabled(e.target.checked)
                    setQuery('')
                    setFilteredQuery('')
                  }}
                />
                <label className="form-check-label">
                  {useTransitionEnabled ? 'useTransition ON' : 'useTransition OFF (direct)'}
                </label>
              </div>

              <input
                className="form-control form-control-sm mb-2"
                placeholder={`Filter ${LARGE_LIST_SIZE.toLocaleString()} names...`}
                value={query}
                onChange={e => handleFilter(e.target.value)}
              />

              {isPending && (
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="spinner-border spinner-border-sm text-info" />
                  <span className="text-info small">Updating list...</span>
                </div>
              )}

              <div style={{ maxHeight: 200, overflowY: 'auto', fontSize: '0.85rem' }}>
                <p className="text-muted mb-1">{filteredNames.length} results</p>
                {filteredNames.slice(0, 100).map((name, i) => (
                  <div key={i} className="border-bottom py-1">{name}</div>
                ))}
                {filteredNames.length > 100 && (
                  <p className="text-muted mt-1">...and {filteredNames.length - 100} more</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <code className="snippet">{`// Batching: React 18+ batches all setState in event handlers
function handleClick() {
  setFirstName('John')  // ─┐
  setLastName('Smith')  // ─┤ one single re-render
  setAge(30)            // ─┘
}

// useTransition: mark updates as low priority
const [isPending, startTransition] = useTransition()
function handleFilter(value) {
  setQuery(value)                            // high priority (input)
  startTransition(() => setFiltered(value))  // low priority (list)
}`}</code>
    </div>
  )
}
