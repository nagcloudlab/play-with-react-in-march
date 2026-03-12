import { useState, useId, useRef } from 'react'

export default function AccessibleFormsDemo() {
  const id = useId()
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)
  const contactRef = useRef(null)

  const fieldRefs = { name: nameRef, email: emailRef, phone: phoneRef, contactMethod: contactRef }

  function handleChange(e) {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
    setSubmitted(false)
  }

  function validate() {
    const errs = {}
    if (!values.name.trim()) errs.name = 'Name is required'
    if (!values.email.trim()) {
      errs.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errs.email = 'Please enter a valid email address'
    }
    if (values.phone && !/^\d{10}$/.test(values.phone)) {
      errs.phone = 'Phone must be 10 digits'
    }
    if (!values.contactMethod) {
      errs.contactMethod = 'Please select a preferred contact method'
    }
    return errs
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)

    const errorKeys = Object.keys(errs)
    if (errorKeys.length > 0) {
      // Focus first field with error
      const firstErrorField = fieldRefs[errorKeys[0]]
      firstErrorField.current?.focus()
      return
    }
    setSubmitted(true)
  }

  function handleReset() {
    setValues({ name: '', email: '', phone: '', contactMethod: '' })
    setErrors({})
    setSubmitted(false)
  }

  const errorMessages = Object.values(errors).filter(Boolean)

  const checklist = [
    { label: 'useId() for label/input pairing', done: true },
    { label: 'aria-describedby for help text', done: true },
    { label: 'aria-invalid on error fields', done: true },
    { label: '<fieldset> + <legend> for radio group', done: true },
    { label: 'aria-live="assertive" for errors', done: true },
    { label: 'Focus-first-error on submit', done: true },
  ]

  return (
    <div>
      <h2>Accessible Forms</h2>
      <ul>
        <li><code>useId()</code> generates unique IDs for <code>htmlFor</code>/<code>id</code> pairing — no collisions.</li>
        <li><code>aria-describedby</code> links help text to inputs for screen readers.</li>
        <li><code>aria-invalid</code> marks fields with errors; <code>aria-live=&quot;assertive&quot;</code> announces errors.</li>
        <li><code>&lt;fieldset&gt;</code> and <code>&lt;legend&gt;</code> group related radio buttons semantically.</li>
        <li>On submit failure, the first error field receives focus automatically.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              {/* Live region for screen reader announcements */}
              <div aria-live="assertive" className="visually-hidden">
                {errorMessages.length > 0 && (
                  <span>{errorMessages.length} error{errorMessages.length > 1 ? 's' : ''}: {errorMessages.join('. ')}</span>
                )}
              </div>

              {submitted ? (
                <div className="text-center py-3">
                  <h5 className="text-success">Form submitted successfully!</h5>
                  <pre className="bg-light p-3 rounded d-inline-block text-start">
                    {JSON.stringify(values, null, 2)}
                  </pre>
                  <div className="mt-2">
                    <button className="btn btn-outline-primary btn-sm" onClick={handleReset}>Reset</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* Name field with aria-describedby */}
                  <div className="mb-3">
                    <label htmlFor={`${id}-name`} className="form-label">
                      Name <span className="text-danger">*</span>
                    </label>
                    <input
                      ref={nameRef}
                      id={`${id}-name`}
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      aria-invalid={errors.name ? 'true' : undefined}
                      aria-describedby={`${id}-name-help ${errors.name ? `${id}-name-error` : ''}`}
                    />
                    <div id={`${id}-name-help`} className="form-text">
                      Enter your full name
                    </div>
                    {errors.name && (
                      <div id={`${id}-name-error`} className="invalid-feedback">
                        {errors.name}
                      </div>
                    )}
                  </div>

                  {/* Email field */}
                  <div className="mb-3">
                    <label htmlFor={`${id}-email`} className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      ref={emailRef}
                      id={`${id}-email`}
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={`${id}-email-help ${errors.email ? `${id}-email-error` : ''}`}
                    />
                    <div id={`${id}-email-help`} className="form-text">
                      We&apos;ll never share your email
                    </div>
                    {errors.email && (
                      <div id={`${id}-email-error`} className="invalid-feedback">
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone field */}
                  <div className="mb-3">
                    <label htmlFor={`${id}-phone`} className="form-label">Phone</label>
                    <input
                      ref={phoneRef}
                      id={`${id}-phone`}
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      aria-invalid={errors.phone ? 'true' : undefined}
                      aria-describedby={`${id}-phone-help ${errors.phone ? `${id}-phone-error` : ''}`}
                    />
                    <div id={`${id}-phone-help`} className="form-text">
                      Optional — 10 digits, no dashes
                    </div>
                    {errors.phone && (
                      <div id={`${id}-phone-error`} className="invalid-feedback">
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  {/* Radio group with fieldset + legend */}
                  <fieldset className="mb-3">
                    <legend className="form-label fs-6">
                      Preferred Contact Method <span className="text-danger">*</span>
                    </legend>
                    {['email', 'phone', 'either'].map(opt => (
                      <div className="form-check" key={opt}>
                        <input
                          ref={opt === 'email' ? contactRef : undefined}
                          className="form-check-input"
                          type="radio"
                          name="contactMethod"
                          id={`${id}-contact-${opt}`}
                          value={opt}
                          checked={values.contactMethod === opt}
                          onChange={handleChange}
                          aria-invalid={errors.contactMethod ? 'true' : undefined}
                        />
                        <label className="form-check-label" htmlFor={`${id}-contact-${opt}`}>
                          {opt.charAt(0).toUpperCase() + opt.slice(1)}
                        </label>
                      </div>
                    ))}
                    {errors.contactMethod && (
                      <div className="text-danger small mt-1">{errors.contactMethod}</div>
                    )}
                  </fieldset>

                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              )}
            </div>

            <div className="col-md-4">
              <h6>Accessibility Checklist</h6>
              <ul className="list-unstyled">
                {checklist.map((item, i) => (
                  <li key={i} className="mb-1">
                    <span className="text-success me-1">&#10003;</span>
                    <span className="small">{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <code className="snippet">{`const id = useId()

// Label pairing
<label htmlFor={\`\${id}-name\`}>Name</label>
<input id={\`\${id}-name\`}
  aria-invalid={errors.name ? 'true' : undefined}
  aria-describedby={\`\${id}-name-help \${id}-name-error\`}
/>
<div id={\`\${id}-name-help\`}>Help text</div>
<div id={\`\${id}-name-error\`}>Error message</div>

// Radio group
<fieldset>
  <legend>Contact Method</legend>
  <input type="radio" id={\`\${id}-contact-email\`} />
</fieldset>

// Live error announcements
<div aria-live="assertive">{errorSummary}</div>

// Focus first error on submit
const firstError = fieldRefs[Object.keys(errors)[0]]
firstError.current?.focus()`}</code>
    </div>
  )
}
