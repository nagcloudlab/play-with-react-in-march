import { useState } from 'react'
import {
  MemoryRouter, Routes, Route, useSearchParams, useLocation,
} from 'react-router-dom'

const products = [
  { id: 1, name: 'Laptop', category: 'electronics', price: 999 },
  { id: 2, name: 'Headphones', category: 'electronics', price: 79 },
  { id: 3, name: 'T-Shirt', category: 'clothing', price: 25 },
  { id: 4, name: 'Sneakers', category: 'clothing', price: 120 },
  { id: 5, name: 'Coffee Maker', category: 'kitchen', price: 65 },
  { id: 6, name: 'Blender', category: 'kitchen', price: 45 },
  { id: 7, name: 'Backpack', category: 'accessories', price: 55 },
  { id: 8, name: 'Watch', category: 'accessories', price: 200 },
]

const categories = ['all', 'electronics', 'clothing', 'kitchen', 'accessories']

function LocationBadge() {
  const location = useLocation()
  const full = location.pathname + location.search
  return (
    <span className="badge bg-dark font-monospace fs-6">
      {full}
    </span>
  )
}

function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') || 'all'
  const sort = searchParams.get('sort') || 'name'
  const search = searchParams.get('q') || ''

  const updateParam = (key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      if (value) {
        next.set(key, value)
      } else {
        next.delete(key)
      }
      return next
    })
  }

  let filtered = products
  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category)
  }
  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  }
  if (sort === 'price-asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  } else {
    filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
  }

  return (
    <div>
      <div className="mb-3">
        <span className="text-muted me-2">URL:</span>
        <LocationBadge />
      </div>

      <div className="row g-2 mb-3">
        <div className="col-sm-4">
          <input
            className="form-control form-control-sm"
            placeholder="Search products..."
            value={search}
            onChange={e => updateParam('q', e.target.value)}
          />
        </div>
        <div className="col-sm-4">
          <select
            className="form-select form-select-sm"
            value={category}
            onChange={e => updateParam('category', e.target.value === 'all' ? '' : e.target.value)}
          >
            {categories.map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="col-sm-4">
          <select
            className="form-select form-select-sm"
            value={sort}
            onChange={e => updateParam('sort', e.target.value === 'name' ? '' : e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>
      </div>

      <table className="table table-sm table-striped">
        <thead>
          <tr><th>Name</th><th>Category</th><th>Price</th></tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td><span className="badge bg-secondary">{p.category}</span></td>
              <td>${p.price}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr><td colSpan="3" className="text-center text-muted">No products match</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

function SandboxApp() {
  return (
    <Routes>
      <Route path="*" element={<Catalog />} />
    </Routes>
  )
}

export default function SearchParamsDemo() {
  const [key, setKey] = useState(0)

  return (
    <div>
      <h2>URL Search Params</h2>
      <p className="lead">
        useSearchParams manages the query string (?key=value) just like useState for the URL.
      </p>

      <ul>
        <li><strong>useSearchParams()</strong> returns <code>[searchParams, setSearchParams]</code></li>
        <li><code>searchParams.get(&apos;key&apos;)</code> reads a value, returns <code>null</code> if missing</li>
        <li><code>setSearchParams()</code> accepts a URLSearchParams object or a function updater</li>
        <li>Search params are perfect for filters, sort, pagination — state that belongs in the URL</li>
        <li>Users can bookmark or share filtered views since state is in the URL</li>
      </ul>

      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Product Catalog — Filter &amp; Sort via URL Params</span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setKey(k => k + 1)}
          >
            Reset
          </button>
        </div>
        <div className="card-body">
          <MemoryRouter key={key}>
            <SandboxApp />
          </MemoryRouter>
        </div>
      </div>

      <code className="snippet">{`const [searchParams, setSearchParams] = useSearchParams()

const category = searchParams.get('category') || 'all'

setSearchParams(prev => {
  const next = new URLSearchParams(prev)
  next.set('category', 'electronics')
  return next
})`}</code>
    </div>
  )
}
