export default function Home() {
  return (
    <div>
      <h1>React Routing</h1>
      <p className="lead">
        A hands-on guide to 10 routing concepts in React Router,
        from basic path matching through lazy loading and error boundaries.
      </p>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Routing Basics (5)</h5>
              <p className="card-text">
                Core patterns for defining routes, navigating, and reading URL params.
              </p>
              <ul className="mb-0">
                <li><strong>Basic Routes</strong> — BrowserRouter, Routes, Route, path matching</li>
                <li><strong>Navigation</strong> — Link vs NavLink, active class styling</li>
                <li><strong>Dynamic Routes</strong> — :param syntax, useParams</li>
                <li><strong>Nested Routes</strong> — Outlet, index routes, layout routes</li>
                <li><strong>Programmatic Nav</strong> — useNavigate, replace, state</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Advanced Routing (5)</h5>
              <p className="card-text">
                Production patterns for auth guards, code splitting, and error handling.
              </p>
              <ul className="mb-0">
                <li><strong>URL Search Params</strong> — useSearchParams, filters, pagination</li>
                <li><strong>Protected Routes</strong> — auth guards, login redirect</li>
                <li><strong>Lazy Loading</strong> — React.lazy, Suspense, code splitting</li>
                <li><strong>Data Loading</strong> — fetch + useParams, loading/error states</li>
                <li><strong>Error Handling &amp; 404</strong> — catch-all routes, error boundaries</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="alert alert-info mt-3">
        Click any topic in the sidebar to see an explanation with bullet points,
        a live interactive demo, and a code snippet. This app itself uses React Router
        for sidebar navigation — the sidebar links are real NavLinks!
      </div>
    </div>
  )
}
