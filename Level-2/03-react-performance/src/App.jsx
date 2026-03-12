import { useState } from 'react'
import './App.css'

import Home from './components/Home'
import ReactMemoDemo from './components/optimization/ReactMemoDemo'
import UseMemoDemo from './components/optimization/UseMemoDemo'
import UseCallbackDemo from './components/optimization/UseCallbackDemo'
import CodeSplittingDemo from './components/optimization/CodeSplittingDemo'
import KeyManagementDemo from './components/optimization/KeyManagementDemo'

import ProfilerApiDemo from './components/measurement/ProfilerApiDemo'
import DebouncedRenderingDemo from './components/measurement/DebouncedRenderingDemo'
import VirtualizationDemo from './components/measurement/VirtualizationDemo'
import ExpensiveRendersDemo from './components/measurement/ExpensiveRendersDemo'
import BatchingTransitionsDemo from './components/measurement/BatchingTransitionsDemo'

const optimizationDemos = [
  { key: 'memo', label: 'React.memo', component: ReactMemoDemo },
  { key: 'usememo', label: 'useMemo', component: UseMemoDemo },
  { key: 'usecallback', label: 'useCallback', component: UseCallbackDemo },
  { key: 'codesplit', label: 'Code Splitting', component: CodeSplittingDemo },
  { key: 'keys', label: 'Key Management', component: KeyManagementDemo },
]

const measurementDemos = [
  { key: 'profiler', label: 'Profiler API', component: ProfilerApiDemo },
  { key: 'debounce', label: 'Debounced Rendering', component: DebouncedRenderingDemo },
  { key: 'virtualization', label: 'Virtualization', component: VirtualizationDemo },
  { key: 'expensive', label: 'Expensive Renders', component: ExpensiveRendersDemo },
  { key: 'batching', label: 'Batching & Transitions', component: BatchingTransitionsDemo },
]

export default function App() {
  const [activePage, setActivePage] = useState('home')

  const allDemos = [...optimizationDemos, ...measurementDemos]
  const found = allDemos.find(d => d.key === activePage)
  const ActiveComponent = found ? found.component : Home

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <h4 className="px-3 mb-3">React Performance</h4>

        <div
          className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => setActivePage('home')}
        >
          Home
        </div>

        <hr className="mx-3" />
        <h5>Optimization Techniques</h5>
        {optimizationDemos.map(d => (
          <div
            key={d.key}
            className={`nav-link ${activePage === d.key ? 'active' : ''}`}
            onClick={() => setActivePage(d.key)}
          >
            {d.label}
          </div>
        ))}

        <hr className="mx-3" />
        <h5>Measurement & Scaling</h5>
        {measurementDemos.map(d => (
          <div
            key={d.key}
            className={`nav-link ${activePage === d.key ? 'active' : ''}`}
            onClick={() => setActivePage(d.key)}
          >
            {d.label}
          </div>
        ))}
      </nav>

      <main className="main-content">
        <ActiveComponent />
      </main>
    </div>
  )
}
