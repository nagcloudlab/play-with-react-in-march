import { useState } from 'react'

function ControlledForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')
  const [agree, setAgree] = useState(false)
  const [submitted, setSubmitted] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted({ name, email, role, agree: String(agree) })
  }

  return (
    <div>
      <h6 className="text-primary">Controlled Approach</h6>
      <p className="text-muted small">4 useState calls</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label form-label-sm">Name</label>
          <input className="form-control form-control-sm" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="mb-2">
          <label className="form-label form-label-sm">Email</label>
          <input className="form-control form-control-sm" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mb-2">
          <label className="form-label form-label-sm">Role</label>
          <select className="form-select form-select-sm" value={role} onChange={e => setRole(e.target.value)}>
            <option value="">Choose...</option>
            <option value="dev">Developer</option>
            <option value="design">Designer</option>
            <option value="pm">PM</option>
          </select>
        </div>
        <div className="mb-2 form-check">
          <input type="checkbox" className="form-check-input" id="ctrl-agree" checked={agree} onChange={e => setAgree(e.target.checked)} />
          <label className="form-check-label" htmlFor="ctrl-agree">I agree</label>
        </div>
        <button type="submit" className="btn btn-primary btn-sm">Submit</button>
      </form>
      {submitted && (
        <pre className="bg-light p-2 mt-2 rounded small">{JSON.stringify(submitted, null, 2)}</pre>
      )}
    </div>
  )
}

function FormDataForm() {
  const [submitted, setSubmitted] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    setSubmitted(data)
  }

  return (
    <div>
      <h6 className="text-success">FormData Approach</h6>
      <p className="text-muted small">0 useState calls for fields</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label form-label-sm">Name</label>
          <input className="form-control form-control-sm" name="name" />
        </div>
        <div className="mb-2">
          <label className="form-label form-label-sm">Email</label>
          <input className="form-control form-control-sm" type="email" name="email" />
        </div>
        <div className="mb-2">
          <label className="form-label form-label-sm">Role</label>
          <select className="form-select form-select-sm" name="role" defaultValue="">
            <option value="">Choose...</option>
            <option value="dev">Developer</option>
            <option value="design">Designer</option>
            <option value="pm">PM</option>
          </select>
        </div>
        <div className="mb-2 form-check">
          <input type="checkbox" className="form-check-input" id="fd-agree" name="agree" value="true" />
          <label className="form-check-label" htmlFor="fd-agree">I agree</label>
        </div>
        <button type="submit" className="btn btn-success btn-sm">Submit</button>
      </form>
      {submitted && (
        <pre className="bg-light p-2 mt-2 rounded small">{JSON.stringify(submitted, null, 2)}</pre>
      )}
    </div>
  )
}

export default function FormDataApiDemo() {
  return (
    <div>
      <h2>FormData API</h2>
      <ul>
        <li>The <code>FormData</code> browser API extracts all named fields from a form element.</li>
        <li><code>Object.fromEntries(new FormData(e.target))</code> gives you a plain object — no <code>useState</code> needed.</li>
        <li>Best for simple submit-only forms where you don&apos;t need real-time field access.</li>
        <li>Controlled forms are still preferred when you need live validation or conditional rendering.</li>
      </ul>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 border-end">
              <ControlledForm />
            </div>
            <div className="col-md-6">
              <FormDataForm />
            </div>
          </div>

          <hr />
          <div className="text-center">
            <span className="badge bg-primary me-2">Controlled: 4 useState calls</span>
            <span className="badge bg-success">FormData: 0 useState calls</span>
          </div>
        </div>
      </div>

      <code className="snippet">{`// FormData approach — zero field state
function handleSubmit(e) {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(e.target))
  // data = { name: "...", email: "...", role: "..." }
}

// vs Controlled — one useState per field
const [name, setName] = useState('')
const [email, setEmail] = useState('')
// ... more state for every field`}</code>
    </div>
  )
}
