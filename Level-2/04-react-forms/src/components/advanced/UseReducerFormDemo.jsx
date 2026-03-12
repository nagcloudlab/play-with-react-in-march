import { useReducer, useRef, useState } from 'react'

const initialState = {
  values: { name: '', email: '', phone: '', role: '', bio: '' },
  errors: {},
  touched: {},
}

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
      }
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      }
    case 'TOUCH_FIELD':
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
      }
    case 'VALIDATE_ALL': {
      const errors = {}
      if (!state.values.name.trim()) errors.name = 'Name is required'
      if (!state.values.email.trim()) {
        errors.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(state.values.email)) {
        errors.email = 'Invalid email'
      }
      if (state.values.phone && !/^\d{10}$/.test(state.values.phone)) {
        errors.phone = 'Must be 10 digits'
      }
      if (!state.values.role) errors.role = 'Select a role'
      const touched = {}
      for (const key of Object.keys(state.values)) touched[key] = true
      return { ...state, errors, touched }
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

const fieldDefs = [
  { name: 'name', label: 'Name', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '10 digits' },
  { name: 'role', label: 'Role', type: 'select', options: ['', 'developer', 'designer', 'manager'] },
  { name: 'bio', label: 'Bio', type: 'textarea' },
]

export default function UseReducerFormDemo() {
  const [state, rawDispatch] = useReducer(formReducer, initialState)
  const [log, setLog] = useState([])
  const logEndRef = useRef(null)

  function dispatch(action) {
    const time = new Date().toLocaleTimeString()
    setLog(prev => {
      const next = [...prev, { time, action }]
      return next.length > 15 ? next.slice(-15) : next
    })
    rawDispatch(action)
    // scroll log into view in next tick
    setTimeout(() => logEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: 'VALIDATE_ALL' })
  }

  function handleReset() {
    dispatch({ type: 'RESET' })
    setLog([])
  }

  function badgeColor(type) {
    switch (type) {
      case 'SET_FIELD': return 'bg-primary'
      case 'SET_ERROR': return 'bg-danger'
      case 'TOUCH_FIELD': return 'bg-warning text-dark'
      case 'VALIDATE_ALL': return 'bg-info text-dark'
      case 'RESET': return 'bg-secondary'
      default: return 'bg-dark'
    }
  }

  return (
    <div>
      <h2>useReducer for Forms</h2>
      <ul>
        <li><code>useReducer</code> centralizes form state, errors, and touched fields in a single reducer.</li>
        <li>Actions: <code>SET_FIELD</code>, <code>SET_ERROR</code>, <code>TOUCH_FIELD</code>, <code>VALIDATE_ALL</code>, <code>RESET</code>.</li>
        <li>A wrapped <code>dispatch</code> logs every action with a timestamp before forwarding.</li>
        <li>The action log (right panel) shows the last 15 dispatches with colored badges.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit} noValidate>
                {fieldDefs.map(f => (
                  <div className="mb-2" key={f.name}>
                    <label className="form-label form-label-sm">{f.label}</label>
                    {f.type === 'select' ? (
                      <select
                        className={`form-select form-select-sm ${state.touched[f.name] && state.errors[f.name] ? 'is-invalid' : ''}`}
                        value={state.values[f.name]}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: f.name, value: e.target.value })}
                        onBlur={() => dispatch({ type: 'TOUCH_FIELD', field: f.name })}
                      >
                        {f.options.map(o => (
                          <option key={o} value={o}>{o || 'Select...'}</option>
                        ))}
                      </select>
                    ) : f.type === 'textarea' ? (
                      <textarea
                        className={`form-control form-control-sm ${state.touched[f.name] && state.errors[f.name] ? 'is-invalid' : ''}`}
                        rows="2"
                        value={state.values[f.name]}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: f.name, value: e.target.value })}
                        onBlur={() => dispatch({ type: 'TOUCH_FIELD', field: f.name })}
                      />
                    ) : (
                      <input
                        type={f.type}
                        className={`form-control form-control-sm ${state.touched[f.name] && state.errors[f.name] ? 'is-invalid' : ''}`}
                        placeholder={f.placeholder || ''}
                        value={state.values[f.name]}
                        onChange={e => dispatch({ type: 'SET_FIELD', field: f.name, value: e.target.value })}
                        onBlur={() => dispatch({ type: 'TOUCH_FIELD', field: f.name })}
                      />
                    )}
                    {state.touched[f.name] && state.errors[f.name] && (
                      <div className="invalid-feedback">{state.errors[f.name]}</div>
                    )}
                  </div>
                ))}
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary btn-sm">Validate All</button>
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleReset}>Reset</button>
                </div>
              </form>
            </div>

            <div className="col-md-6">
              <h6>Action Log <span className="badge bg-secondary">{log.length}</span></h6>
              <div className="border rounded p-2" style={{ height: 350, overflowY: 'auto', fontSize: '0.8rem' }}>
                {log.length === 0 && (
                  <p className="text-muted small mb-0">Interact with the form to see dispatched actions...</p>
                )}
                {log.map((entry, i) => (
                  <div key={i} className="mb-1">
                    <span className="text-muted me-1">{entry.time}</span>
                    <span className={`badge ${badgeColor(entry.action.type)} me-1`}>
                      {entry.action.type}
                    </span>
                    {entry.action.field && (
                      <span className="text-secondary">
                        {entry.action.field}
                        {entry.action.value !== undefined && ` = "${entry.action.value}"`}
                        {entry.action.error !== undefined && ` → "${entry.action.error}"`}
                      </span>
                    )}
                  </div>
                ))}
                <div ref={logEndRef} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <code className="snippet">{`function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, values: { ...state.values, [action.field]: action.value } }
    case 'VALIDATE_ALL':
      return { ...state, errors: validateAll(state.values) }
    case 'RESET':
      return initialState
  }
}

// Wrapped dispatch that logs before forwarding
function dispatch(action) {
  setLog(prev => [...prev, { time: new Date().toLocaleTimeString(), action }])
  rawDispatch(action)
}`}</code>
    </div>
  )
}
