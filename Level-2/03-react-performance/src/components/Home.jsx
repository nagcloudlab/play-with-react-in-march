export default function Home() {
  return (
    <div>
      <h1>React Performance</h1>
      <p className="lead">
        A hands-on guide to 10 key React performance concepts,
        with live interactive demos and measurable results.
      </p>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Optimization Techniques (5)</h5>
              <p className="card-text">
                Techniques to prevent unnecessary work and reduce bundle size.
              </p>
              <ul className="mb-0">
                <li><strong>React.memo</strong> — skip re-renders when props haven't changed</li>
                <li><strong>useMemo</strong> — cache expensive computations</li>
                <li><strong>useCallback</strong> — stabilize function references</li>
                <li><strong>Code Splitting</strong> — lazy-load components on demand</li>
                <li><strong>Key Management</strong> — correct reconciliation with keys</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Measurement &amp; Scaling (5)</h5>
              <p className="card-text">
                Tools and patterns for measuring and handling large-scale rendering.
              </p>
              <ul className="mb-0">
                <li><strong>Profiler API</strong> — measure render timing programmatically</li>
                <li><strong>Debounced Rendering</strong> — tame rapid input updates</li>
                <li><strong>Virtualization</strong> — render only visible items</li>
                <li><strong>Expensive Renders</strong> — isolate and fix slow components</li>
                <li><strong>Batching &amp; Transitions</strong> — group updates intelligently</li>
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
