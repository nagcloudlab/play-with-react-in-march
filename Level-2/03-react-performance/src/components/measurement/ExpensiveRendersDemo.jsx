import { useState, memo } from 'react'

function expensiveWork() {
  const start = performance.now()
  // Simulate expensive render (~50ms)
  let sum = 0
  for (let i = 0; i < 2_000_000; i++) {
    sum += Math.sqrt(i)
  }
  const duration = performance.now() - start
  return { sum, duration }
}

// Expensive child that always does heavy computation
function HeavyChild() {
  const { duration } = expensiveWork()
  return (
    <div className="alert alert-warning mb-0">
      <strong>Heavy Child</strong> — rendered in{' '}
      <span className={duration > 16 ? 'text-danger fw-bold' : 'text-success'}>
        {duration.toFixed(1)} ms
      </span>
      <div className="progress mt-2" style={{ height: 8 }}>
        <div
          className={`progress-bar ${duration > 16 ? 'bg-danger' : 'bg-success'}`}
          style={{ width: `${Math.min(duration / 100 * 100, 100)}%` }}
        />
      </div>
    </div>
  )
}

const MemoHeavyChild = memo(HeavyChild)

// Tab 1: Expensive child blocks input
function Tab1() {
  const [text, setText] = useState('')
  return (
    <div>
      <p>The expensive child re-renders on every keystroke, blocking the input.</p>
      <input
        className="form-control mb-3"
        placeholder="Try typing here (laggy)..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <HeavyChild />
    </div>
  )
}

// Tab 2: Isolate state into a separate component
function TypingArea() {
  const [text, setText] = useState('')
  return (
    <input
      className="form-control mb-3"
      placeholder="Try typing here (smooth)..."
      value={text}
      onChange={e => setText(e.target.value)}
    />
  )
}

function Tab2() {
  return (
    <div>
      <p>The input is isolated in its own component. Typing doesn't re-render the heavy child.</p>
      <TypingArea />
      <HeavyChild />
    </div>
  )
}

// Tab 3: React.memo on the expensive child
function Tab3() {
  const [text, setText] = useState('')
  return (
    <div>
      <p>Using <code>React.memo</code> — the heavy child skips re-renders when it has no changing props.</p>
      <input
        className="form-control mb-3"
        placeholder="Try typing here (smooth with memo)..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <MemoHeavyChild />
    </div>
  )
}

export default function ExpensiveRendersDemo() {
  const [activeTab, setActiveTab] = useState(1)

  return (
    <div>
      <h2>Expensive Renders</h2>
      <ul>
        <li>An expensive child component can block user input if it re-renders too often.</li>
        <li><strong>Tab 1</strong>: typing re-renders both input and heavy child — visible lag.</li>
        <li><strong>Tab 2</strong>: isolating the input in its own component prevents the parent from re-rendering.</li>
        <li><strong>Tab 3</strong>: <code>React.memo</code> on the heavy child skips re-renders when props are unchanged.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <ul className="nav nav-tabs mb-3">
            {[1, 2, 3].map(tab => (
              <li key={tab} className="nav-item">
                <button
                  className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 1 && 'Problem: Blocks Input'}
                  {tab === 2 && 'Fix 1: Isolate State'}
                  {tab === 3 && 'Fix 2: React.memo'}
                </button>
              </li>
            ))}
          </ul>

          {activeTab === 1 && <Tab1 />}
          {activeTab === 2 && <Tab2 />}
          {activeTab === 3 && <Tab3 />}
        </div>
      </div>

      <code className="snippet">{`// Fix 1: Isolate state — input lives in its own component
function TypingArea() {
  const [text, setText] = useState('')
  return <input value={text} onChange={e => setText(e.target.value)} />
}
function Page() {
  return <><TypingArea /><HeavyChild /></> // HeavyChild doesn't re-render
}

// Fix 2: React.memo — skip re-renders when props unchanged
const MemoHeavyChild = memo(HeavyChild)`}</code>
    </div>
  )
}
