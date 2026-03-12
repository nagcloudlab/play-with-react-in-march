import { useState } from 'react'

let nextId = 4

function createItems() {
  return [
    { id: 1, text: 'Apple' },
    { id: 2, text: 'Banana' },
    { id: 3, text: 'Cherry' },
  ]
}

function EditableList({ items, useIdKey, borderColor, label }) {
  return (
    <div className="card h-100" style={{ borderColor, borderWidth: 2, borderStyle: 'solid' }}>
      <div className="card-body">
        <h6 style={{ color: borderColor }}>{label}</h6>
        <ul className="list-group">
          {items.map((item, index) => (
            <li key={useIdKey ? item.id : index} className="list-group-item d-flex align-items-center gap-2">
              <span className="badge bg-secondary">{useIdKey ? `id:${item.id}` : `idx:${index}`}</span>
              <span>{item.text}</span>
              <input
                className="form-control form-control-sm ms-auto"
                style={{ width: 120 }}
                placeholder="Type here..."
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function KeyManagementDemo() {
  const [items, setItems] = useState(createItems)
  const [formKey, setFormKey] = useState(0)

  function addToTop() {
    setItems(prev => [{ id: nextId++, text: `Item ${nextId - 1}` }, ...prev])
  }

  function shuffle() {
    setItems(prev => [...prev].sort(() => Math.random() - 0.5))
  }

  function reset() {
    nextId = 4
    setItems(createItems())
  }

  return (
    <div>
      <h2>Key Management</h2>
      <ul>
        <li>React uses <code>key</code> to match elements between renders.</li>
        <li>Using <code>index</code> as key causes state to stay with the position, not the item.</li>
        <li>Using a stable <code>id</code> as key ensures state follows the item correctly.</li>
        <li>Bonus: changing <code>key</code> on a component forces React to unmount and remount it (useful for form resets).</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-primary" onClick={addToTop}>Add to Top</button>
            <button className="btn btn-warning" onClick={shuffle}>Shuffle</button>
            <button className="btn btn-outline-secondary" onClick={reset}>Reset</button>
          </div>

          <p className="text-muted small">
            Type something in the inputs, then click Shuffle or Add to Top.
            Watch how typed text behaves differently in each list.
          </p>

          <div className="row">
            <div className="col-md-6 mb-3">
              <EditableList
                items={items}
                useIdKey={false}
                borderColor="#dc3545"
                label="key={index} — state stays with position"
              />
            </div>
            <div className="col-md-6 mb-3">
              <EditableList
                items={items}
                useIdKey={true}
                borderColor="#198754"
                label="key={item.id} — state follows item"
              />
            </div>
          </div>
        </div>
      </div>

      <h5>Bonus: Key as Form Reset</h5>
      <div className="card mb-4">
        <div className="card-body">
          <p>Changing the <code>key</code> prop forces React to destroy and recreate the component, resetting all internal state.</p>
          <div className="d-flex align-items-end gap-3">
            <div key={formKey}>
              <label className="form-label">Type something, then click Reset:</label>
              <input className="form-control" placeholder="This resets when key changes..." />
            </div>
            <button className="btn btn-danger" onClick={() => setFormKey(k => k + 1)}>
              Reset Form (key={formKey} → {formKey + 1})
            </button>
          </div>
        </div>
      </div>

      <code className="snippet">{`// Bad: state stays with position
items.map((item, index) => <Input key={index} />)

// Good: state follows item
items.map(item => <Input key={item.id} />)

// Bonus: key change = full remount
<Form key={resetCounter} />`}</code>
    </div>
  )
}
