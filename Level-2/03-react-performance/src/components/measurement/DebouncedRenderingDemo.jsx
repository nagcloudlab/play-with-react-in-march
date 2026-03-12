import { useState, useRef, useTransition } from 'react'

const ITEM_COUNT = 10000
const allItems = Array.from({ length: ITEM_COUNT }, (_, i) => `Item ${i + 1} — ${['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'][i % 5]}`)

function FilteredList({ items }) {
  return (
    <div style={{ maxHeight: 250, overflowY: 'auto', fontSize: '0.85rem' }}>
      <p className="text-muted mb-1">{items.length} results</p>
      {items.slice(0, 200).map((item, i) => (
        <div key={i} className="border-bottom py-1">{item}</div>
      ))}
      {items.length > 200 && <p className="text-muted mt-1">...and {items.length - 200} more</p>}
    </div>
  )
}

function filterItems(query) {
  if (!query) return allItems
  const lower = query.toLowerCase()
  return allItems.filter(item => item.toLowerCase().includes(lower))
}

export default function DebouncedRenderingDemo() {
  // Column 1: No debounce
  const [query1, setQuery1] = useState('')
  const filtered1 = filterItems(query1)

  // Column 2: Debounced (event-handler-based)
  const [query2, setQuery2] = useState('')
  const [debouncedQuery2, setDebouncedQuery2] = useState('')
  const timerRef = useRef(null)
  const filtered2 = filterItems(debouncedQuery2)

  function handleDebounced(value) {
    setQuery2(value)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setDebouncedQuery2(value)
    }, 300)
  }

  // Column 3: useTransition
  const [query3, setQuery3] = useState('')
  const [transitionQuery3, setTransitionQuery3] = useState('')
  const [isPending, startTransition] = useTransition()
  const filtered3 = filterItems(transitionQuery3)

  function handleTransition(value) {
    setQuery3(value)
    startTransition(() => {
      setTransitionQuery3(value)
    })
  }

  return (
    <div>
      <h2>Debounced Rendering</h2>
      <ul>
        <li>Filtering 10,000 items on every keystroke can cause visible lag.</li>
        <li><strong>No debounce</strong>: filter runs on every keystroke — input feels sluggish.</li>
        <li><strong>Debounced (300ms)</strong>: delays the filter via <code>setTimeout</code> in the event handler + <code>useRef</code> for the timer ID.</li>
        <li><strong>useTransition</strong>: marks the filter as a low-priority update — input stays responsive, with a pending indicator.</li>
      </ul>

      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card border-danger h-100">
            <div className="card-body">
              <h6 className="text-danger">No Debounce</h6>
              <input
                className="form-control form-control-sm mb-2"
                placeholder="Filter 10K items..."
                value={query1}
                onChange={e => setQuery1(e.target.value)}
              />
              <FilteredList items={filtered1} label="no-debounce" />
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-warning h-100">
            <div className="card-body">
              <h6 className="text-warning">Debounced 300ms</h6>
              <input
                className="form-control form-control-sm mb-2"
                placeholder="Filter 10K items..."
                value={query2}
                onChange={e => handleDebounced(e.target.value)}
              />
              <FilteredList items={filtered2} label="debounced" />
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card border-success h-100">
            <div className="card-body">
              <h6 className="text-success">
                useTransition {isPending && <span className="spinner-border spinner-border-sm ms-2" />}
              </h6>
              <input
                className="form-control form-control-sm mb-2"
                placeholder="Filter 10K items..."
                value={query3}
                onChange={e => handleTransition(e.target.value)}
              />
              <FilteredList items={filtered3} label="transition" />
            </div>
          </div>
        </div>
      </div>

      <code className="snippet">{`// Debounced via event handler + useRef
const timerRef = useRef(null)
function handleChange(value) {
  setQuery(value)                        // input updates instantly
  clearTimeout(timerRef.current)
  timerRef.current = setTimeout(() => {
    setFilteredQuery(value)              // filter runs after 300ms
  }, 300)
}

// useTransition — React prioritizes input over list
const [isPending, startTransition] = useTransition()
function handleChange(value) {
  setQuery(value)                        // high priority
  startTransition(() => setFilteredQuery(value)) // low priority
}`}</code>
    </div>
  )
}
