import { useState } from 'react'
import { validateQuery } from '../../utils/queryParser'

export default function QueryInput({ query, onQueryChange, columns }) {
  const [showHelp, setShowHelp] = useState(false)

  const validation = query.trim() ? validateQuery(query) : { valid: true }

  const colNames = columns.map((c) => c.name).slice(0, 5).join(', ')

  return (
    <div className="filter-group query-input">
      <div className="d-flex justify-content-between align-items-center">
        <label>SQL Query</label>
        <button
          className="btn btn-link btn-sm p-0"
          style={{ fontSize: '0.75rem' }}
          onClick={() => setShowHelp(!showHelp)}
        >
          {showHelp ? 'Hide help' : 'Syntax help'}
        </button>
      </div>
      <textarea
        className={`form-control form-control-sm ${query.trim() && !validation.valid ? 'is-invalid' : ''}`}
        rows={2}
        placeholder={`e.g. ${columns[0]?.name || 'column'} > 100`}
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      {query.trim() && !validation.valid && (
        <div className="query-error">{validation.error}</div>
      )}
      {showHelp && (
        <div className="query-help mt-1">
          <strong>Operators:</strong> =, !=, &lt;, &gt;, &lt;=, &gt;=<br />
          <strong>Keywords:</strong> AND, OR, NOT, IN, LIKE, IS NULL<br />
          <strong>Examples:</strong><br />
          <code>{columns[0]?.name || 'col'} &gt; 30</code><br />
          <code>{columns[0]?.name || 'col'} LIKE &quot;%text%&quot;</code><br />
          <code>{columns[0]?.name || 'col'} IN (&quot;a&quot;, &quot;b&quot;)</code><br />
          <strong>Columns:</strong> {colNames}{columns.length > 5 ? '...' : ''}
        </div>
      )}
    </div>
  )
}
