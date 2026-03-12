import { useState, memo } from 'react'

function NormalChild({ name }) {
  const rendered = new Date().toLocaleTimeString()
  return (
    <div className="card h-100 border-danger">
      <div className="card-body">
        <h6 className="card-title text-danger">Normal Child</h6>
        <p>Name: <strong>{name}</strong></p>
        <p className="text-muted mb-0">Last rendered: {rendered}</p>
      </div>
    </div>
  )
}

const MemoChild = memo(function MemoChild({ name }) {
  const rendered = new Date().toLocaleTimeString()
  return (
    <div className="card h-100 border-success">
      <div className="card-body">
        <h6 className="card-title text-success">Memo Child</h6>
        <p>Name: <strong>{name}</strong></p>
        <p className="text-muted mb-0">Last rendered: {rendered}</p>
      </div>
    </div>
  )
})

export default function ReactMemoDemo() {
  const [, forceRender] = useState(0)
  const [name, setName] = useState('Alice')

  return (
    <div>
      <h2>React.memo</h2>
      <ul>
        <li><code>React.memo</code> wraps a component so it skips re-rendering when its props haven't changed.</li>
        <li>The Normal Child re-renders every time the parent renders (timestamp updates).</li>
        <li>The Memo Child only re-renders when its <code>name</code> prop actually changes.</li>
        <li>Use <code>React.memo</code> for pure components that render often but receive the same props.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex gap-3 align-items-center mb-3">
            <button
              className="btn btn-primary"
              onClick={() => forceRender(n => n + 1)}
            >
              Force Parent Re-render
            </button>
            <div className="d-flex align-items-center gap-2">
              <label className="form-label mb-0">Name:</label>
              <input
                className="form-control form-control-sm"
                style={{ width: 150 }}
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <NormalChild name={name} />
            </div>
            <div className="col-md-6 mb-3">
              <MemoChild name={name} />
            </div>
          </div>

          <p className="text-muted small mb-0">
            Click "Force Parent Re-render" — the Normal Child timestamp updates every time,
            but the Memo Child timestamp stays the same until you change the name.
          </p>
        </div>
      </div>

      <code className="snippet">{`const MemoChild = memo(function MemoChild({ name }) {
  const rendered = new Date().toLocaleTimeString()
  return <div>Name: {name} — Last rendered: {rendered}</div>
})

// Parent re-renders → MemoChild skips if name unchanged`}</code>
    </div>
  )
}
