import { useState, Profiler } from 'react'

function ItemList({ count }) {
  const items = []
  for (let i = 0; i < count; i++) {
    items.push(
      <div key={i} className="d-flex justify-content-between border-bottom py-1" style={{ fontSize: '0.85rem' }}>
        <span>Item {i + 1}</span>
        <span className="text-muted">value-{(i * 7 + 13) % 100}</span>
      </div>
    )
  }
  return <div style={{ maxHeight: 200, overflowY: 'auto' }}>{items}</div>
}

function durationColor(ms) {
  if (ms < 5) return 'text-success'
  if (ms <= 16) return 'text-warning'
  return 'text-danger'
}

function durationBadge(ms) {
  if (ms < 5) return 'bg-success'
  if (ms <= 16) return 'bg-warning text-dark'
  return 'bg-danger'
}

export default function ProfilerApiDemo() {
  const [count, setCount] = useState(500)
  const [logs, setLogs] = useState([])

  function onRender(id, phase, actualDuration, baseDuration) {
    setLogs(prev => [
      { id, phase, actualDuration, baseDuration, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 19),
    ])
  }

  return (
    <div>
      <h2>Profiler API</h2>
      <ul>
        <li>The <code>&lt;Profiler&gt;</code> component measures render timing programmatically.</li>
        <li><strong>actualDuration</strong>: time spent rendering this update.</li>
        <li><strong>baseDuration</strong>: estimated time to render the entire subtree without memoization.</li>
        <li>Color-coded: <span className="text-success fw-bold">&lt;5ms</span>, <span className="text-warning fw-bold">5-16ms</span>, <span className="text-danger fw-bold">&gt;16ms</span></li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3 mb-3">
            <label className="form-label mb-0">
              Items: <strong>{count}</strong>
            </label>
            <input
              type="range"
              className="form-range"
              style={{ width: 250 }}
              min={100}
              max={5000}
              step={100}
              value={count}
              onChange={e => setCount(Number(e.target.value))}
            />
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setLogs([])}
            >
              Clear Logs
            </button>
          </div>

          <Profiler id="ItemList" onRender={onRender}>
            <ItemList count={count} />
          </Profiler>
        </div>
      </div>

      <h5>Render Log</h5>
      <div className="table-responsive">
        <table className="table table-sm table-bordered">
          <thead className="table-light">
            <tr>
              <th>Time</th>
              <th>Phase</th>
              <th>Actual Duration</th>
              <th>Base Duration</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 && (
              <tr><td colSpan={4} className="text-muted text-center">Move the slider to generate render logs</td></tr>
            )}
            {logs.map((log, i) => (
              <tr key={i}>
                <td>{log.timestamp}</td>
                <td><span className="badge bg-info">{log.phase}</span></td>
                <td>
                  <span className={`fw-bold ${durationColor(log.actualDuration)}`}>
                    {log.actualDuration.toFixed(2)} ms
                  </span>
                </td>
                <td>
                  <span className={`badge ${durationBadge(log.baseDuration)}`}>
                    {log.baseDuration.toFixed(2)} ms
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <code className="snippet">{`<Profiler id="ItemList" onRender={(id, phase, actualDuration, baseDuration) => {
  console.log({ id, phase, actualDuration, baseDuration })
}}>
  <ItemList count={count} />
</Profiler>`}</code>
    </div>
  )
}
