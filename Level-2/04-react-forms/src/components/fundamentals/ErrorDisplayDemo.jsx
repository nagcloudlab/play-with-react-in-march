import { useState, useRef } from 'react'

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Name is required'
  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email format'
  }
  if (!values.password) {
    errors.password = 'Password is required'
  } else if (values.password.length < 6) {
    errors.password = 'Must be at least 6 characters'
  }
  return errors
}

const fields = ['name', 'email', 'password']

function InlineErrors() {
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    setErrors(validate(values))
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {fields.map(f => (
        <div className="mb-2" key={f}>
          <input
            className={`form-control form-control-sm ${errors[f] ? 'is-invalid' : ''}`}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            type={f === 'password' ? 'password' : 'text'}
            value={values[f]}
            onChange={e => setValues(prev => ({ ...prev, [f]: e.target.value }))}
          />
          {errors[f] && <div className="invalid-feedback">{errors[f]}</div>}
        </div>
      ))}
      <button type="submit" className="btn btn-primary btn-sm">Submit</button>
    </form>
  )
}

function TooltipErrors() {
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    setErrors(validate(values))
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {fields.map(f => (
        <div className="mb-2 position-relative" key={f}>
          <input
            className={`form-control form-control-sm ${errors[f] ? 'is-invalid' : ''}`}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            type={f === 'password' ? 'password' : 'text'}
            value={values[f]}
            onChange={e => setValues(prev => ({ ...prev, [f]: e.target.value }))}
          />
          {errors[f] && (
            <div
              className="position-absolute bg-danger text-white px-2 py-1 rounded small"
              style={{ top: 0, right: 0, transform: 'translateY(-100%)', fontSize: '0.75rem', zIndex: 10 }}
            >
              {errors[f]}
            </div>
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary btn-sm">Submit</button>
    </form>
  )
}

function SummaryErrors() {
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const refs = { name: useRef(null), email: useRef(null), password: useRef(null) }

  function handleSubmit(e) {
    e.preventDefault()
    setErrors(validate(values))
  }

  function focusField(field) {
    refs[field].current?.focus()
  }

  const errorList = Object.entries(errors).filter(([, v]) => v)

  return (
    <form onSubmit={handleSubmit} noValidate>
      {errorList.length > 0 && (
        <div className="alert alert-danger py-2 small">
          <strong>Please fix the following:</strong>
          <ul className="mb-0 mt-1">
            {errorList.map(([key, msg]) => (
              <li key={key}>
                <span
                  className="text-decoration-underline"
                  style={{ cursor: 'pointer' }}
                  onClick={() => focusField(key)}
                >
                  {msg}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {fields.map(f => (
        <div className="mb-2" key={f}>
          <input
            ref={refs[f]}
            className={`form-control form-control-sm ${errors[f] ? 'is-invalid' : ''}`}
            placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
            type={f === 'password' ? 'password' : 'text'}
            value={values[f]}
            onChange={e => setValues(prev => ({ ...prev, [f]: e.target.value }))}
          />
        </div>
      ))}
      <button type="submit" className="btn btn-primary btn-sm">Submit</button>
    </form>
  )
}

function ToastErrors() {
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [toasts, setToasts] = useState([])

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(values)
    const messages = Object.values(errs).filter(Boolean)
    if (messages.length > 0) {
      const id = Date.now()
      setToasts(prev => [...prev, { id, messages }])
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id))
      }, 3000)
    }
  }

  return (
    <div className="position-relative">
      <form onSubmit={handleSubmit} noValidate>
        {fields.map(f => (
          <div className="mb-2" key={f}>
            <input
              className="form-control form-control-sm"
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              type={f === 'password' ? 'password' : 'text'}
              value={values[f]}
              onChange={e => setValues(prev => ({ ...prev, [f]: e.target.value }))}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary btn-sm">Submit</button>
      </form>

      <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
        {toasts.map(t => (
          <div key={t.id} className="toast show mb-2" role="alert">
            <div className="toast-header bg-danger text-white">
              <strong className="me-auto">Validation Error</strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
              />
            </div>
            <div className="toast-body small">
              {t.messages.map((m, i) => <div key={i}>{m}</div>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const tabs = [
  { key: 'inline', label: 'Inline', component: InlineErrors },
  { key: 'tooltip', label: 'Tooltip', component: TooltipErrors },
  { key: 'summary', label: 'Summary', component: SummaryErrors },
  { key: 'toast', label: 'Toast', component: ToastErrors },
]

export default function ErrorDisplayDemo() {
  const [activeTab, setActiveTab] = useState('inline')

  const ActivePanel = tabs.find(t => t.key === activeTab).component

  return (
    <div>
      <h2>Error Display Patterns</h2>
      <ul>
        <li><strong>Inline</strong> — error text below each field using Bootstrap&apos;s <code>is-invalid</code> + <code>invalid-feedback</code>.</li>
        <li><strong>Tooltip</strong> — positioned popup above the field for a cleaner layout.</li>
        <li><strong>Summary</strong> — alert box at the top listing all errors, with click-to-focus links.</li>
        <li><strong>Toast</strong> — auto-dismissing fixed notification (3 seconds) in the corner.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <ul className="nav nav-tabs mb-3">
            {tabs.map(t => (
              <li className="nav-item" key={t.key}>
                <button
                  className={`nav-link ${activeTab === t.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.label}
                </button>
              </li>
            ))}
          </ul>

          <ActivePanel />

          <p className="text-muted small mt-3 mb-0">
            Try submitting with empty fields in each tab to see how errors are displayed.
          </p>
        </div>
      </div>

      <code className="snippet">{`// Inline: Bootstrap validation classes
<input className={\`form-control \${errors.name ? 'is-invalid' : ''}\`} />
{errors.name && <div className="invalid-feedback">{errors.name}</div>}

// Summary: Alert with click-to-focus
<div className="alert alert-danger">
  {errors.map(err => <li onClick={() => ref.current.focus()}>{err}</li>)}
</div>

// Toast: Auto-dismiss with setTimeout in handler
const id = Date.now()
setToasts(prev => [...prev, { id, messages }])
setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)`}</code>
    </div>
  )
}
