import { useState, useRef } from 'react'

const takenUsernames = ['admin', 'user', 'test', 'john']

function checkUsername(username) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(!takenUsernames.includes(username.toLowerCase()))
    }, 500)
  })
}

export default function AsyncValidationDemo() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usernameStatus, setUsernameStatus] = useState('idle') // idle | checking | available | taken
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const timerRef = useRef(null)

  function handleUsernameChange(e) {
    const value = e.target.value
    setUsername(value)
    setSubmitted(false)

    if (timerRef.current) clearTimeout(timerRef.current)

    if (!value.trim()) {
      setUsernameStatus('idle')
      return
    }

    setUsernameStatus('checking')
    timerRef.current = setTimeout(() => {
      checkUsername(value).then(available => {
        setUsernameStatus(available ? 'available' : 'taken')
      })
    }, 300)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = {}
    if (!username.trim()) errs.username = 'Username is required'
    else if (usernameStatus === 'taken') errs.username = 'Username is taken'
    else if (usernameStatus === 'checking') errs.username = 'Still checking...'
    if (!email.trim()) {
      errs.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Invalid email'
    }
    if (!password) {
      errs.password = 'Password is required'
    } else if (password.length < 6) {
      errs.password = 'Must be at least 6 characters'
    }
    setErrors(errs)
    if (Object.keys(errs).length === 0) setSubmitted(true)
  }

  function statusIcon() {
    if (usernameStatus === 'checking') {
      return <span className="spinner-border spinner-border-sm text-secondary ms-2" />
    }
    if (usernameStatus === 'available') {
      return <span className="text-success ms-2 fw-bold">&#10003; Available</span>
    }
    if (usernameStatus === 'taken') {
      return <span className="text-danger ms-2 fw-bold">&#10007; Taken</span>
    }
    return null
  }

  return (
    <div>
      <h2>Async Validation</h2>
      <ul>
        <li>Username availability is checked against a simulated API (500ms delay).</li>
        <li>Debounced at 300ms using a <code>useRef</code> timer — cleared on each keystroke.</li>
        <li>Status indicators: spinner while checking, checkmark if available, X if taken.</li>
        <li>Taken usernames: <code>admin</code>, <code>user</code>, <code>test</code>, <code>john</code>.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          {submitted ? (
            <div className="text-center py-3">
              <h5 className="text-success">Account created!</h5>
              <p>Username: <strong>{username}</strong></p>
              <button className="btn btn-outline-primary btn-sm" onClick={() => {
                setSubmitted(false)
                setUsername('')
                setEmail('')
                setPassword('')
                setUsernameStatus('idle')
                setErrors({})
              }}>
                Reset
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 400 }}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <div className="d-flex align-items-center">
                  <input
                    className={`form-control ${errors.username ? 'is-invalid' : usernameStatus === 'available' ? 'is-valid' : ''}`}
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Try: admin, user, test, john"
                  />
                  {statusIcon()}
                </div>
                {errors.username && <div className="text-danger small mt-1">{errors.username}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={e => { setEmail(e.target.value); setSubmitted(false) }}
                  placeholder="user@example.com"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setSubmitted(false) }}
                  placeholder="At least 6 characters"
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <button type="submit" className="btn btn-primary">Create Account</button>
            </form>
          )}
        </div>
      </div>

      <code className="snippet">{`const timerRef = useRef(null)

function handleUsernameChange(e) {
  const value = e.target.value
  setUsername(value)
  if (timerRef.current) clearTimeout(timerRef.current)

  setUsernameStatus('checking')
  timerRef.current = setTimeout(() => {
    checkUsername(value).then(available => {
      setUsernameStatus(available ? 'available' : 'taken')
    })
  }, 300) // 300ms debounce
}`}</code>
    </div>
  )
}
