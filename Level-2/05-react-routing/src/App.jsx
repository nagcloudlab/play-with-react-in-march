import { NavLink, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './components/Home'
import BasicRoutesDemo from './components/basics/BasicRoutesDemo'
import NavigationDemo from './components/basics/NavigationDemo'
import DynamicRoutesDemo from './components/basics/DynamicRoutesDemo'
import NestedRoutesDemo from './components/basics/NestedRoutesDemo'
import ProgrammaticNavDemo from './components/basics/ProgrammaticNavDemo'

import SearchParamsDemo from './components/advanced/SearchParamsDemo'
import ProtectedRoutesDemo from './components/advanced/ProtectedRoutesDemo'
import LazyLoadingDemo from './components/advanced/LazyLoadingDemo'
import DataLoadingDemo from './components/advanced/DataLoadingDemo'
import ErrorHandlingDemo from './components/advanced/ErrorHandlingDemo'

const basicsDemos = [
  { path: 'basic-routes', label: 'Basic Routes', component: BasicRoutesDemo },
  { path: 'navigation', label: 'Navigation', component: NavigationDemo },
  { path: 'dynamic-routes', label: 'Dynamic Routes', component: DynamicRoutesDemo },
  { path: 'nested-routes', label: 'Nested Routes', component: NestedRoutesDemo },
  { path: 'programmatic-nav', label: 'Programmatic Nav', component: ProgrammaticNavDemo },
]

const advancedDemos = [
  { path: 'search-params', label: 'URL Search Params', component: SearchParamsDemo },
  { path: 'protected-routes', label: 'Protected Routes', component: ProtectedRoutesDemo },
  { path: 'lazy-loading', label: 'Lazy Loading', component: LazyLoadingDemo },
  { path: 'data-loading', label: 'Data Loading', component: DataLoadingDemo },
  { path: 'error-handling', label: 'Error Handling & 404', component: ErrorHandlingDemo },
]

export default function App() {
  return (
    <div className="app-layout">
      <nav className="sidebar">
        <h4 className="px-3 mb-3">React Routing</h4>

        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>

        <hr className="mx-3" />
        <h5>Routing Basics</h5>
        {basicsDemos.map(d => (
          <NavLink key={d.path} to={`/${d.path}`} className="nav-link">
            {d.label}
          </NavLink>
        ))}

        <hr className="mx-3" />
        <h5>Advanced Routing</h5>
        {advancedDemos.map(d => (
          <NavLink key={d.path} to={`/${d.path}`} className="nav-link">
            {d.label}
          </NavLink>
        ))}
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          {basicsDemos.map(d => (
            <Route key={d.path} path={`/${d.path}/*`} element={<d.component />} />
          ))}
          {advancedDemos.map(d => (
            <Route key={d.path} path={`/${d.path}/*`} element={<d.component />} />
          ))}
        </Routes>
      </main>
    </div>
  )
}
