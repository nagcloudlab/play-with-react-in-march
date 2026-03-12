import { useState, useMemo } from 'react'

function fibonacci(n) {
  if (n <= 1) return n
  return fibonacci(n - 1) + fibonacci(n - 2)
}

function computeWithTiming(n) {
  const start = performance.now()
  const result = fibonacci(n)
  const duration = performance.now() - start
  return { result, duration }
}

export default function UseMemoDemo() {
  const [n, setN] = useState(30)
  const [theme, setTheme] = useState('light')

  // Without useMemo: recomputes every render (including theme toggle)
  const withoutMemo = computeWithTiming(n)

  // With useMemo: only recomputes when n changes
  const withMemo = useMemo(() => computeWithTiming(n), [n])

  const bgColor = theme === 'light' ? '#ffffff' : '#2d2d2d'
  const textColor = theme === 'light' ? '#000000' : '#ffffff'

  return (
    <div>
      <h2>useMemo</h2>
      <ul>
        <li><code>useMemo</code> caches the result of an expensive computation.</li>
        <li>It only recomputes when its dependencies change.</li>
        <li>Without it, toggling theme re-runs Fibonacci — causing visible lag for large N.</li>
        <li>With it, the cached result is returned instantly on theme toggles.</li>
      </ul>

      <div className="card mb-4" style={{ backgroundColor: bgColor, color: textColor }}>
        <div className="card-body">
          <div className="d-flex gap-3 align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <label className="form-label mb-0" style={{ color: textColor }}>
                Fibonacci N: <strong>{n}</strong>
              </label>
              <input
                type="range"
                className="form-range"
                style={{ width: 200 }}
                min={1}
                max={38}
                value={n}
                onChange={e => setN(Number(e.target.value))}
              />
            </div>
            <button
              className="btn btn-outline-secondary"
              onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            >
              Toggle Theme ({theme})
            </button>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card border-danger" style={{ backgroundColor: bgColor }}>
                <div className="card-body" style={{ color: textColor }}>
                  <h6 className="text-danger">Without useMemo</h6>
                  <p>fib({n}) = <strong>{withoutMemo.result}</strong></p>
                  <p className="mb-0">
                    Computed in:{' '}
                    <span className={withoutMemo.duration > 16 ? 'text-danger fw-bold' : 'text-success'}>
                      {withoutMemo.duration.toFixed(2)} ms
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card border-success" style={{ backgroundColor: bgColor }}>
                <div className="card-body" style={{ color: textColor }}>
                  <h6 className="text-success">With useMemo</h6>
                  <p>fib({n}) = <strong>{withMemo.result}</strong></p>
                  <p className="mb-0">
                    Computed in:{' '}
                    <span className={withMemo.duration > 16 ? 'text-danger fw-bold' : 'text-success'}>
                      {withMemo.duration.toFixed(2)} ms
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="small mb-0" style={{ color: textColor, opacity: 0.7 }}>
            Try N=35+ and toggle theme. The left panel recomputes each time (slow).
            The right panel uses the cached result (instant).
          </p>
        </div>
      </div>

      <code className="snippet">{`const result = useMemo(() => fibonacci(n), [n])
// Only recomputes when n changes — theme toggle is free`}</code>
    </div>
  )
}
