export default function Home() {
  return (
    <div>
      <h1>React Forms</h1>
      <p className="lead">
        A hands-on guide to 10 form handling concepts in React,
        from basic controlled inputs through custom hooks and accessibility.
      </p>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Form Fundamentals (5)</h5>
              <p className="card-text">
                Core patterns for handling form state, validation, and dynamic fields.
              </p>
              <ul className="mb-0">
                <li><strong>Controlled Inputs</strong> — every HTML input type in one form</li>
                <li><strong>FormData API</strong> — zero-state form handling with the browser API</li>
                <li><strong>Validation Strategies</strong> — on submit, on blur, and on change</li>
                <li><strong>Error Display Patterns</strong> — inline, tooltip, summary, and toast</li>
                <li><strong>Dynamic Fields</strong> — add, remove, and reorder form rows</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Advanced Patterns (5)</h5>
              <p className="card-text">
                Scalable architectures for complex real-world form scenarios.
              </p>
              <ul className="mb-0">
                <li><strong>Multi-Step Wizard</strong> — step-by-step registration with progress</li>
                <li><strong>Async Validation</strong> — debounced server-side checks</li>
                <li><strong>useReducer for Forms</strong> — centralized state with action log</li>
                <li><strong>Custom useForm Hook</strong> — reusable form logic abstraction</li>
                <li><strong>Accessible Forms</strong> — ARIA attributes and focus management</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info mt-3">
        Click any topic in the sidebar to see an explanation with bullet points,
        a live interactive demo, and a code snippet.
      </div>
    </div>
  )
}
