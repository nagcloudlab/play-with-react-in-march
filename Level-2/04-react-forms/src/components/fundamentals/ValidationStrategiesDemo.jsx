import { useState } from 'react'

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
    errors.password = 'Password must be at least 6 characters'
  }
  return errors
}

function OnSubmitForm() {
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setSuccess(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSuccess(true)
  }

  return (
    <div>
      <h6 className="text-primary">On Submit</h6>
      <p className="text-muted small">Errors appear only after clicking submit</p>
      <form onSubmit={handleSubmit} noValidate>
        {['name', 'email', 'password'].map(field => (
          <div className="mb-2" key={field}>
            <input
              type={field === 'password' ? 'password' : 'text'}
              className={`form-control form-control-sm ${errors[field] ? 'is-invalid' : ''}`}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={values[field]}
              onChange={handleChange}
            />
            {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
          </div>
        ))}
        <button type="submit" className="btn btn-primary btn-sm">Submit</button>
        {success && <span className="text-success ms-2 small">Valid!</span>}
      </form>
    </div>
  )
}

function OnBlurForm() {
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      const allErrors = validate({ ...values, [name]: value })
      setErrors(prev => ({ ...prev, [name]: allErrors[name] || null }))
    }
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    const allErrors = validate(values)
    setErrors(prev => ({ ...prev, [name]: allErrors[name] || null }))
  }

  return (
    <div>
      <h6 className="text-warning">On Blur</h6>
      <p className="text-muted small">Errors appear when you leave a field</p>
      <form onSubmit={e => e.preventDefault()} noValidate>
        {['name', 'email', 'password'].map(field => (
          <div className="mb-2" key={field}>
            <input
              type={field === 'password' ? 'password' : 'text'}
              className={`form-control form-control-sm ${touched[field] && errors[field] ? 'is-invalid' : ''}`}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={values[field]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched[field] && errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
          </div>
        ))}
        <button type="submit" className="btn btn-warning btn-sm">Submit</button>
      </form>
    </div>
  )
}

function OnChangeForm() {
  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [dirty, setDirty] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    const next = { ...values, [name]: value }
    setValues(next)
    setDirty(prev => ({ ...prev, [name]: true }))
    const allErrors = validate(next)
    setErrors(prev => ({ ...prev, [name]: allErrors[name] || null }))
  }

  return (
    <div>
      <h6 className="text-danger">On Change (Real-Time)</h6>
      <p className="text-muted small">Errors appear and clear as you type</p>
      <form onSubmit={e => e.preventDefault()} noValidate>
        {['name', 'email', 'password'].map(field => (
          <div className="mb-2" key={field}>
            <input
              type={field === 'password' ? 'password' : 'text'}
              className={`form-control form-control-sm ${dirty[field] && errors[field] ? 'is-invalid' : ''} ${dirty[field] && !errors[field] ? 'is-valid' : ''}`}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={values[field]}
              onChange={handleChange}
            />
            {dirty[field] && errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
          </div>
        ))}
        <button type="submit" className="btn btn-danger btn-sm">Submit</button>
      </form>
    </div>
  )
}

export default function ValidationStrategiesDemo() {
  return (
    <div>
      <h2>Validation Strategies</h2>
      <ul>
        <li><strong>On Submit</strong> — simplest; user sees all errors at once after clicking submit.</li>
        <li><strong>On Blur</strong> — validates when a field loses focus; balances feedback vs distraction.</li>
        <li><strong>On Change</strong> — real-time; errors appear and clear as you type. Most responsive but can feel aggressive.</li>
        <li>All three use the same validation rules — only the <em>timing</em> differs.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 border-end">
              <OnSubmitForm />
            </div>
            <div className="col-md-4 border-end">
              <OnBlurForm />
            </div>
            <div className="col-md-4">
              <OnChangeForm />
            </div>
          </div>

          <hr />
          <div className="alert alert-secondary mb-0 small">
            <strong>Tradeoff:</strong> On Submit is least intrusive but delays feedback.
            On Change gives instant feedback but can feel overwhelming.
            On Blur is the sweet spot for most forms — validate when the user is done with a field.
          </div>
        </div>
      </div>

      <code className="snippet">{`// Same validate() function, different timing:

// On Submit — validate in handleSubmit
const errs = validate(values)
setErrors(errs)

// On Blur — validate in onBlur handler
function handleBlur(e) {
  const allErrors = validate(values)
  setErrors(prev => ({ ...prev, [e.target.name]: allErrors[e.target.name] }))
}

// On Change — validate in onChange handler
function handleChange(e) {
  const next = { ...values, [e.target.name]: e.target.value }
  setErrors(prev => ({ ...prev, [e.target.name]: validate(next)[e.target.name] }))
}`}</code>
    </div>
  )
}
