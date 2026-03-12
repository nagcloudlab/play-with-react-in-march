import { useState } from 'react'

const stepLabels = ['Personal Info', 'Preferences', 'Review & Submit']

function validateStep(step, data) {
  const errors = {}
  if (step === 0) {
    if (!data.firstName.trim()) errors.firstName = 'First name is required'
    if (!data.lastName.trim()) errors.lastName = 'Last name is required'
    if (!data.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email format'
    }
  }
  if (step === 1) {
    if (!data.role) errors.role = 'Please select a role'
    if (!data.experience) errors.experience = 'Please select experience level'
  }
  return errors
}

const initialData = {
  firstName: '',
  lastName: '',
  email: '',
  role: '',
  experience: '',
  newsletter: false,
}

export default function MultiStepWizardDemo() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(initialData)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, type, value, checked } = e.target
    setData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  function handleNext() {
    const errs = validateStep(step, data)
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      setStep(prev => prev + 1)
    }
  }

  function handleBack() {
    setErrors({})
    setStep(prev => prev - 1)
  }

  function handleSubmit() {
    setSubmitted(true)
  }

  function handleReset() {
    setStep(0)
    setData(initialData)
    setErrors({})
    setSubmitted(false)
  }

  const progress = ((step + 1) / stepLabels.length) * 100

  return (
    <div>
      <h2>Multi-Step Wizard</h2>
      <ul>
        <li>Breaks a long form into digestible steps with a progress indicator.</li>
        <li>Per-step validation before &quot;Next&quot; — you can&apos;t skip ahead with invalid data.</li>
        <li>&quot;Back&quot; skips validation so users can freely navigate backwards.</li>
        <li>Final step shows a review table before submission.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          {submitted ? (
            <div className="text-center py-4">
              <h4 className="text-success">Registration Complete!</h4>
              <pre className="bg-light p-3 rounded d-inline-block text-start mt-3">
                {JSON.stringify(data, null, 2)}
              </pre>
              <div className="mt-3">
                <button className="btn btn-outline-primary" onClick={handleReset}>
                  Start Over
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  {stepLabels.map((label, i) => (
                    <span
                      key={i}
                      className={`small ${i === step ? 'fw-bold text-primary' : 'text-muted'}`}
                    >
                      {i + 1}. {label}
                    </span>
                  ))}
                </div>
                <div className="progress" style={{ height: 6 }}>
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%`, transition: 'width 0.3s' }}
                  />
                </div>
              </div>

              {step === 0 && (
                <div>
                  <h5>Personal Info</h5>
                  <div className="mb-2">
                    <label className="form-label">First Name</label>
                    <input
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      name="firstName"
                      value={data.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Last Name</label>
                    <input
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      name="lastName"
                      value={data.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Email</label>
                    <input
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      type="email"
                      value={data.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <h5>Preferences</h5>
                  <div className="mb-2">
                    <label className="form-label">Role</label>
                    <select
                      className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                      name="role"
                      value={data.role}
                      onChange={handleChange}
                    >
                      <option value="">Select role...</option>
                      <option value="developer">Developer</option>
                      <option value="designer">Designer</option>
                      <option value="manager">Manager</option>
                    </select>
                    {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Experience</label>
                    <select
                      className={`form-select ${errors.experience ? 'is-invalid' : ''}`}
                      name="experience"
                      value={data.experience}
                      onChange={handleChange}
                    >
                      <option value="">Select level...</option>
                      <option value="junior">Junior (0-2 years)</option>
                      <option value="mid">Mid (3-5 years)</option>
                      <option value="senior">Senior (5+ years)</option>
                    </select>
                    {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                  </div>
                  <div className="form-check mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="newsletter"
                      name="newsletter"
                      checked={data.newsletter}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="newsletter">
                      Subscribe to newsletter
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h5>Review & Submit</h5>
                  <table className="table table-sm">
                    <tbody>
                      <tr><th>Name</th><td>{data.firstName} {data.lastName}</td></tr>
                      <tr><th>Email</th><td>{data.email}</td></tr>
                      <tr><th>Role</th><td>{data.role}</td></tr>
                      <tr><th>Experience</th><td>{data.experience}</td></tr>
                      <tr><th>Newsletter</th><td>{data.newsletter ? 'Yes' : 'No'}</td></tr>
                    </tbody>
                  </table>
                </div>
              )}

              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleBack}
                  disabled={step === 0}
                >
                  Back
                </button>
                {step < stepLabels.length - 1 ? (
                  <button className="btn btn-primary" onClick={handleNext}>
                    Next
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={handleSubmit}>
                    Submit
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      <code className="snippet">{`const [step, setStep] = useState(0)

function handleNext() {
  const errs = validateStep(step, data)
  if (Object.keys(errs).length === 0) setStep(s => s + 1)
}

function handleBack() {
  setStep(s => s - 1)  // no validation on back
}

// Progress bar
<div className="progress-bar" style={{ width: \`\${((step + 1) / total) * 100}%\` }} />`}</code>
    </div>
  )
}
