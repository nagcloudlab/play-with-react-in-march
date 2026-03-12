import { useState, useCallback, memo } from 'react'

const Child = memo(function Child({ label, onClick, borderColor }) {
  const rendered = new Date().toLocaleTimeString()
  return (
    <div className={`card h-100`} style={{ borderColor, borderWidth: 2, borderStyle: 'solid' }}>
      <div className="card-body">
        <h6 style={{ color: borderColor }}>{label}</h6>
        <button className="btn btn-sm btn-outline-secondary mb-2" onClick={onClick}>
          Click me
        </button>
        <p className="text-muted small mb-0">Last rendered: {rendered}</p>
      </div>
    </div>
  )
})

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0)

  // Inline function — new reference every render
  const inlineHandler = () => {
    setCount(c => c + 1)
  }

  // Stable callback — same reference always
  const stableHandler = useCallback(() => {
    setCount(c => c + 1)
  }, [])

  // Dep-tracking callback — new reference when count changes
  const depHandler = useCallback(() => {
    setCount(count + 1)
  }, [count])

  return (
    <div>
      <h2>useCallback</h2>
      <ul>
        <li><code>useCallback</code> returns a memoized function that only changes when its dependencies change.</li>
        <li>Combined with <code>React.memo</code>, it prevents unnecessary child re-renders.</li>
        <li>An inline function creates a new reference every render, breaking memo.</li>
        <li>A stable callback (<code>[]</code> deps) never causes child re-renders.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-3">
            <h5 className="mb-0">Parent count: {count}</h5>
            <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
              Increment Parent
            </button>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <Child
                label="Inline fn (always re-renders)"
                onClick={inlineHandler}
                borderColor="#dc3545"
              />
            </div>
            <div className="col-md-4 mb-3">
              <Child
                label="useCallback(fn, []) (never)"
                onClick={stableHandler}
                borderColor="#198754"
              />
            </div>
            <div className="col-md-4 mb-3">
              <Child
                label="useCallback(fn, [count])"
                onClick={depHandler}
                borderColor="#fd7e14"
              />
            </div>
          </div>

          <p className="text-muted small mb-0">
            Click "Increment Parent" — the inline child always re-renders (new function ref),
            the stable child never re-renders, and the dep-tracking child re-renders on count change.
          </p>
        </div>
      </div>

      <code className="snippet">{`const stableHandler = useCallback(() => {
  setCount(c => c + 1)
}, []) // [] → same reference forever → memo child skips

const depHandler = useCallback(() => {
  setCount(count + 1)
}, [count]) // new ref when count changes → memo child re-renders`}</code>
    </div>
  )
}
