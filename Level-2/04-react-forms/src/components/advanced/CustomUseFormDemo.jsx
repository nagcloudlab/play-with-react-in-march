import { useState } from 'react'

function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function handleChange(e) {
    const { name, type, value, checked } = e.target
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleBlur(e) {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
    if (validate) {
      const errs = validate(values)
      setErrors(prev => ({ ...prev, [name]: errs[name] || null }))
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    const allTouched = {}
    for (const key of Object.keys(values)) allTouched[key] = true
    setTouched(allTouched)

    if (validate) {
      const errs = validate(values)
      setErrors(errs)
      if (Object.keys(errs).length > 0) return
    }
    onSubmit(values)
  }

  function reset() {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }

  return { values, errors, touched, handleChange, handleBlur, handleSubmit, reset }
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(null)

  const form = useForm({
    initialValues: { name: '', email: '', message: '' },
    validate(values) {
      const errs = {}
      if (!values.name.trim()) errs.name = 'Name is required'
      if (!values.email.trim()) {
        errs.email = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errs.email = 'Invalid email'
      }
      if (!values.message.trim()) errs.message = 'Message is required'
      return errs
    },
    onSubmit(values) {
      setSubmitted(values)
    },
  })

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">Contact Form</div>
      <div className="card-body">
        {submitted ? (
          <div>
            <p className="text-success fw-bold">Sent!</p>
            <pre className="bg-light p-2 rounded small">{JSON.stringify(submitted, null, 2)}</pre>
            <button className="btn btn-sm btn-outline-primary" onClick={() => { form.reset(); setSubmitted(null) }}>
              Reset
            </button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit} noValidate>
            <div className="mb-2">
              <input
                className={`form-control form-control-sm ${form.touched.name && form.errors.name ? 'is-invalid' : ''}`}
                name="name"
                placeholder="Name"
                value={form.values.name}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.touched.name && form.errors.name && <div className="invalid-feedback">{form.errors.name}</div>}
            </div>
            <div className="mb-2">
              <input
                className={`form-control form-control-sm ${form.touched.email && form.errors.email ? 'is-invalid' : ''}`}
                name="email"
                type="email"
                placeholder="Email"
                value={form.values.email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.touched.email && form.errors.email && <div className="invalid-feedback">{form.errors.email}</div>}
            </div>
            <div className="mb-2">
              <textarea
                className={`form-control form-control-sm ${form.touched.message && form.errors.message ? 'is-invalid' : ''}`}
                name="message"
                rows="3"
                placeholder="Message"
                value={form.values.message}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.touched.message && form.errors.message && <div className="invalid-feedback">{form.errors.message}</div>}
            </div>
            <button type="submit" className="btn btn-primary btn-sm">Send</button>
          </form>
        )}
      </div>
    </div>
  )
}

function LoginForm() {
  const [submitted, setSubmitted] = useState(null)

  const form = useForm({
    initialValues: { username: '', password: '' },
    validate(values) {
      const errs = {}
      if (!values.username.trim()) errs.username = 'Username is required'
      if (!values.password) {
        errs.password = 'Password is required'
      } else if (values.password.length < 6) {
        errs.password = 'At least 6 characters'
      }
      return errs
    },
    onSubmit(values) {
      setSubmitted(values)
    },
  })

  return (
    <div className="card">
      <div className="card-header bg-success text-white">Login Form</div>
      <div className="card-body">
        {submitted ? (
          <div>
            <p className="text-success fw-bold">Logged in!</p>
            <pre className="bg-light p-2 rounded small">{JSON.stringify(submitted, null, 2)}</pre>
            <button className="btn btn-sm btn-outline-success" onClick={() => { form.reset(); setSubmitted(null) }}>
              Reset
            </button>
          </div>
        ) : (
          <form onSubmit={form.handleSubmit} noValidate>
            <div className="mb-2">
              <input
                className={`form-control form-control-sm ${form.touched.username && form.errors.username ? 'is-invalid' : ''}`}
                name="username"
                placeholder="Username"
                value={form.values.username}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.touched.username && form.errors.username && <div className="invalid-feedback">{form.errors.username}</div>}
            </div>
            <div className="mb-2">
              <input
                className={`form-control form-control-sm ${form.touched.password && form.errors.password ? 'is-invalid' : ''}`}
                name="password"
                type="password"
                placeholder="Password"
                value={form.values.password}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
              {form.touched.password && form.errors.password && <div className="invalid-feedback">{form.errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-success btn-sm">Login</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function CustomUseFormDemo() {
  return (
    <div>
      <h2>Custom useForm Hook</h2>
      <ul>
        <li>A reusable <code>useForm</code> hook encapsulates values, errors, touched state, and handlers.</li>
        <li>Takes <code>initialValues</code>, <code>validate</code>, and <code>onSubmit</code> as configuration.</li>
        <li>Returns <code>{'{ values, errors, touched, handleChange, handleBlur, handleSubmit, reset }'}</code>.</li>
        <li>Two cards below prove reusability — same hook, different forms and validation rules.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <ContactForm />
            </div>
            <div className="col-md-6 mb-3">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>

      <code className="snippet">{`function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  function handleChange(e) {
    const { name, type, value, checked } = e.target
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length === 0) onSubmit(values)
  }

  return { values, errors, touched, handleChange, handleBlur, handleSubmit, reset }
}`}</code>
    </div>
  )
}
