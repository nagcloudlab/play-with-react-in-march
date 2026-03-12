import { useState } from 'react'

const initialValues = {
  text: '',
  email: '',
  password: '',
  number: 50,
  range: 50,
  date: '',
  checkbox: false,
  radio: 'option1',
  select: '',
  textarea: '',
  color: '#0d6efd',
}

export default function ControlledInputsDemo() {
  const [form, setForm] = useState(initialValues)

  function handleChange(e) {
    const { name, type, value, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleReset() {
    setForm(initialValues)
  }

  return (
    <div>
      <h2>Controlled Inputs</h2>
      <ul>
        <li>Every input value is stored in React state — the component is the single source of truth.</li>
        <li>A single <code>handleChange</code> handles all input types by checking <code>e.target.type</code>.</li>
        <li>Checkboxes use <code>checked</code> instead of <code>value</code>.</li>
        <li>The live JSON preview updates in real-time as you type.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-7">
              <form onSubmit={e => e.preventDefault()}>
                <div className="mb-3">
                  <label className="form-label">Text</label>
                  <input
                    type="text"
                    className="form-control"
                    name="text"
                    value={form.text}
                    onChange={handleChange}
                    placeholder="Enter text..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="user@example.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter password..."
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label">Number</label>
                    <input
                      type="number"
                      className="form-control"
                      name="number"
                      value={form.number}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Range ({form.range})</label>
                    <input
                      type="range"
                      className="form-range"
                      name="range"
                      min="0"
                      max="100"
                      value={form.range}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="checkbox"
                    id="checkboxInput"
                    checked={form.checkbox}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="checkboxInput">
                    I agree to the terms
                  </label>
                </div>

                <div className="mb-3">
                  <label className="form-label">Radio</label>
                  <div>
                    {['option1', 'option2', 'option3'].map(opt => (
                      <div className="form-check form-check-inline" key={opt}>
                        <input
                          type="radio"
                          className="form-check-input"
                          name="radio"
                          id={`radio-${opt}`}
                          value={opt}
                          checked={form.radio === opt}
                          onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor={`radio-${opt}`}>
                          {opt}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Select</label>
                  <select
                    className="form-select"
                    name="select"
                    value={form.select}
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option value="react">React</option>
                    <option value="vue">Vue</option>
                    <option value="angular">Angular</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Textarea</label>
                  <textarea
                    className="form-control"
                    name="textarea"
                    rows="2"
                    value={form.textarea}
                    onChange={handleChange}
                    placeholder="Write something..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Color</label>
                  <input
                    type="color"
                    className="form-control form-control-color"
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                  />
                </div>

                <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                  Reset All
                </button>
              </form>
            </div>

            <div className="col-md-5">
              <div className="sticky-top" style={{ top: '1rem' }}>
                <h6>Live State Preview</h6>
                <pre className="bg-dark text-success p-3 rounded" style={{ fontSize: '0.85rem' }}>
                  {JSON.stringify(form, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <code className="snippet">{`const [form, setForm] = useState(initialValues)

function handleChange(e) {
  const { name, type, value, checked } = e.target
  setForm(prev => ({
    ...prev,
    [name]: type === 'checkbox' ? checked : value,
  }))
}

// Works for text, email, number, range, date,
// select, textarea, radio, color, and checkbox`}</code>
    </div>
  )
}
