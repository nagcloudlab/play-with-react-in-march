import { useState } from 'react'
import './App.css'

import Home from './components/Home'
import ControlledInputsDemo from './components/fundamentals/ControlledInputsDemo'
import FormDataApiDemo from './components/fundamentals/FormDataApiDemo'
import ValidationStrategiesDemo from './components/fundamentals/ValidationStrategiesDemo'
import ErrorDisplayDemo from './components/fundamentals/ErrorDisplayDemo'
import DynamicFieldsDemo from './components/fundamentals/DynamicFieldsDemo'

import MultiStepWizardDemo from './components/advanced/MultiStepWizardDemo'
import AsyncValidationDemo from './components/advanced/AsyncValidationDemo'
import UseReducerFormDemo from './components/advanced/UseReducerFormDemo'
import CustomUseFormDemo from './components/advanced/CustomUseFormDemo'
import AccessibleFormsDemo from './components/advanced/AccessibleFormsDemo'

const fundamentalDemos = [
  { key: 'controlled', label: 'Controlled Inputs', component: ControlledInputsDemo },
  { key: 'formdata', label: 'FormData API', component: FormDataApiDemo },
  { key: 'validation', label: 'Validation Strategies', component: ValidationStrategiesDemo },
  { key: 'errors', label: 'Error Display Patterns', component: ErrorDisplayDemo },
  { key: 'dynamic', label: 'Dynamic Fields', component: DynamicFieldsDemo },
]

const advancedDemos = [
  { key: 'wizard', label: 'Multi-Step Wizard', component: MultiStepWizardDemo },
  { key: 'async', label: 'Async Validation', component: AsyncValidationDemo },
  { key: 'reducer', label: 'useReducer for Forms', component: UseReducerFormDemo },
  { key: 'useform', label: 'Custom useForm Hook', component: CustomUseFormDemo },
  { key: 'accessible', label: 'Accessible Forms', component: AccessibleFormsDemo },
]

export default function App() {
  const [activePage, setActivePage] = useState('home')

  const allDemos = [...fundamentalDemos, ...advancedDemos]
  const found = allDemos.find(d => d.key === activePage)
  const ActiveComponent = found ? found.component : Home

  return (
    <div className="app-layout">
      <nav className="sidebar">
        <h4 className="px-3 mb-3">React Forms</h4>

        <div
          className={`nav-link ${activePage === 'home' ? 'active' : ''}`}
          onClick={() => setActivePage('home')}
        >
          Home
        </div>

        <hr className="mx-3" />
        <h5>Form Fundamentals</h5>
        {fundamentalDemos.map(d => (
          <div
            key={d.key}
            className={`nav-link ${activePage === d.key ? 'active' : ''}`}
            onClick={() => setActivePage(d.key)}
          >
            {d.label}
          </div>
        ))}

        <hr className="mx-3" />
        <h5>Advanced Patterns</h5>
        {advancedDemos.map(d => (
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
