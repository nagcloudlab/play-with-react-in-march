import { useState } from 'react'
import { MemoryRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'

function LocationBadge() {
  const location = useLocation()
  return (
    <span className="badge bg-dark font-monospace fs-6">
      {location.pathname}
    </span>
  )
}

function Page({ title }) {
  return <div className="p-3 bg-light rounded">{title} page content</div>
}

function LinkSandbox() {
  return (
    <div>
      <div className="mb-3">
        <span className="text-muted me-2">URL:</span>
        <LocationBadge />
      </div>

      <h6>Using &lt;Link&gt; (no active styling)</h6>
      <div className="d-flex gap-2 mb-3">
        <Link to="/navigation" className="btn btn-outline-secondary btn-sm">Home</Link>
        <Link to="/navigation/products" className="btn btn-outline-secondary btn-sm">Products</Link>
        <Link to="/navigation/about" className="btn btn-outline-secondary btn-sm">About</Link>
      </div>

      <h6>Using &lt;NavLink&gt; (active class auto-applied)</h6>
      <div className="d-flex gap-2 mb-3">
        <NavLink
          to="/navigation"
          end
          className={({ isActive }) =>
            `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/navigation/products"
          className={({ isActive }) =>
            `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/navigation/about"
          className={({ isActive }) =>
            `btn btn-sm ${isActive ? 'btn-primary' : 'btn-outline-primary'}`
          }
        >
          About
        </NavLink>
      </div>

      <Routes>
        <Route path="/" element={<Page title="Home" />} />
        <Route path="/products" element={<Page title="Products" />} />
        <Route path="/about" element={<Page title="About" />} />
      </Routes>
    </div>
  )
}

export default function NavigationDemo() {
  const [key, setKey] = useState(0)

  return (
    <div>
      <h2>Navigation</h2>
      <p className="lead">
        Link and NavLink render accessible anchor tags for client-side navigation.
      </p>

      <ul>
        <li><strong>Link</strong> renders an <code>&lt;a&gt;</code> tag that navigates without a page reload</li>
        <li><strong>NavLink</strong> is a Link that knows whether it&apos;s &quot;active&quot; (matches the current URL)</li>
        <li>NavLink accepts a <code>className</code> function: <code>{`({ isActive }) => ...`}</code></li>
        <li>Use <code>end</code> prop on NavLink to prevent <code>/</code> from matching all routes</li>
        <li>Both Link and NavLink use <code>to</code> prop instead of <code>href</code></li>
      </ul>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Link vs NavLink Comparison</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setKey(k => k + 1)}
          >
            Reset
          </button>
        </div>
        <div className="card-body">
          {/* <MemoryRouter key={key}> */}
          <LinkSandbox />
          {/* </MemoryRouter> */}
        </div>
      </div>

      <code className="snippet">{`<NavLink
  to="/products"
  className={({ isActive }) =>
    isActive ? "nav-link active" : "nav-link"
  }
>
  Products
</NavLink>`}</code>
    </div>
  )
}
