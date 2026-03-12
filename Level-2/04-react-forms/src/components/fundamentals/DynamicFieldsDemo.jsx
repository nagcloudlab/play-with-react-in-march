import { useState, useRef } from 'react'

export default function DynamicFieldsDemo() {
  const nextId = useRef(1)
  const [items, setItems] = useState([
    { id: 0, description: '', quantity: 1, price: 0 },
  ])

  function addItem() {
    const id = nextId.current++
    setItems(prev => [...prev, { id, description: '', quantity: 1, price: 0 }])
  }

  function removeItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  function updateItem(id, field, value) {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    )
  }

  function moveItem(index, direction) {
    setItems(prev => {
      const next = [...prev]
      const targetIndex = index + direction
      if (targetIndex < 0 || targetIndex >= next.length) return prev
      const temp = next[index]
      next[index] = next[targetIndex]
      next[targetIndex] = temp
      return next
    })
  }

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <div>
      <h2>Dynamic Form Fields</h2>
      <ul>
        <li>Add and remove line items dynamically — like an invoice builder.</li>
        <li>Each row has a unique <code>id</code> from a <code>useRef</code> counter (event handler only, not during render).</li>
        <li>Reorder rows with up/down buttons. Line totals and subtotal compute automatically.</li>
        <li>Uses immutable array updates: <code>map</code>, <code>filter</code>, and swap-by-index.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <table className="table table-sm align-middle">
            <thead>
              <tr>
                <th style={{ width: 40 }}>#</th>
                <th>Description</th>
                <th style={{ width: 100 }}>Qty</th>
                <th style={{ width: 120 }}>Price</th>
                <th style={{ width: 100 }}>Total</th>
                <th style={{ width: 120 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td className="text-muted">{index + 1}</td>
                  <td>
                    <input
                      className="form-control form-control-sm"
                      placeholder="Item description"
                      value={item.description}
                      onChange={e => updateItem(item.id, 'description', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      min="1"
                      value={item.quantity}
                      onChange={e => updateItem(item.id, 'quantity', Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <div className="input-group input-group-sm">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control form-control-sm"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={e => updateItem(item.id, 'price', Number(e.target.value))}
                      />
                    </div>
                  </td>
                  <td className="text-end fw-bold">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => moveItem(index, -1)}
                        disabled={index === 0}
                        title="Move up"
                      >
                        &#9650;
                      </button>
                      <button
                        className="btn btn-outline-secondary"
                        onClick={() => moveItem(index, 1)}
                        disabled={index === items.length - 1}
                        title="Move down"
                      >
                        &#9660;
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => removeItem(item.id)}
                        disabled={items.length === 1}
                        title="Remove"
                      >
                        &times;
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4" className="text-end fw-bold">Subtotal:</td>
                <td className="text-end fw-bold text-primary">
                  ${subtotal.toFixed(2)}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>

          <button className="btn btn-success btn-sm" onClick={addItem}>
            + Add Line Item
          </button>
        </div>
      </div>

      <code className="snippet">{`const nextId = useRef(1) // counter in ref, incremented in handler only

function addItem() {
  const id = nextId.current++
  setItems(prev => [...prev, { id, description: '', quantity: 1, price: 0 }])
}

function removeItem(id) {
  setItems(prev => prev.filter(item => item.id !== id))
}

function moveItem(index, direction) {
  setItems(prev => {
    const next = [...prev]
    const target = index + direction
    ;[next[index], next[target]] = [next[target], next[index]]
    return next
  })
}`}</code>
    </div>
  )
}
