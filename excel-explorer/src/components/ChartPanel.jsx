import { useState, useMemo } from 'react'
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const CHART_TYPES = ['Bar', 'Line', 'Pie', 'Scatter']
const AGGREGATIONS = ['count', 'sum', 'avg', 'none']
const COLORS = ['#0d6efd', '#198754', '#dc3545', '#ffc107', '#6610f2', '#0dcaf0', '#fd7e14', '#20c997']
const MAX_POINTS = 500

export default function ChartPanel({ data, columns }) {
  const numericCols = columns.filter((c) => c.type === 'number')
  const allCols = columns

  const [chartType, setChartType] = useState('Bar')
  const [xAxis, setXAxis] = useState(allCols[0]?.name || '')
  const [yAxis, setYAxis] = useState(numericCols[0]?.name || '')
  const [aggregation, setAggregation] = useState('count')
  const [collapsed, setCollapsed] = useState(false)

  const chartData = useMemo(() => {
    if (!data || data.length === 0 || !xAxis) return []

    if (aggregation === 'none') {
      // No aggregation — raw scatter/line
      return data.slice(0, MAX_POINTS).map((row) => ({
        x: row[xAxis],
        y: yAxis ? Number(row[yAxis]) || 0 : 0,
        name: String(row[xAxis]),
      }))
    }

    // Group by xAxis
    const groups = {}
    for (const row of data) {
      const key = String(row[xAxis] ?? '(empty)')
      if (!groups[key]) groups[key] = []
      groups[key].push(row)
    }

    const entries = Object.entries(groups)
    return entries.slice(0, MAX_POINTS).map(([key, rows]) => {
      let value = 0
      if (aggregation === 'count') {
        value = rows.length
      } else if (aggregation === 'sum' && yAxis) {
        value = rows.reduce((s, r) => s + (Number(r[yAxis]) || 0), 0)
      } else if (aggregation === 'avg' && yAxis) {
        const nums = rows.map((r) => Number(r[yAxis])).filter((n) => !isNaN(n))
        value = nums.length > 0 ? nums.reduce((s, n) => s + n, 0) / nums.length : 0
      }
      return { name: key, value: Math.round(value * 100) / 100 }
    })
  }, [data, xAxis, yAxis, aggregation])

  function renderChart() {
    if (chartData.length === 0) {
      return <p className="text-muted text-center">No data to chart. Adjust your filters or axes.</p>
    }

    const commonProps = { data: chartData }

    switch (chartType) {
      case 'Bar':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill={COLORS[0]} name={aggregation === 'none' ? yAxis : `${aggregation}(${yAxis || '*'})`} />
            </BarChart>
          </ResponsiveContainer>
        )
      case 'Line':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke={COLORS[0]} name={aggregation === 'none' ? yAxis : `${aggregation}(${yAxis || '*'})`} />
            </LineChart>
          </ResponsiveContainer>
        )
      case 'Pie':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label>
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )
      case 'Scatter':
        return (
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name={xAxis} tick={{ fontSize: 12 }} />
              <YAxis dataKey="y" name={yAxis} tick={{ fontSize: 12 }} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={chartData} fill={COLORS[0]} />
            </ScatterChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <div className="chart-section">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">Chart</h6>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? 'Show' : 'Hide'}
        </button>
      </div>

      {!collapsed && (
        <>
          <div className="chart-config">
            <div className="form-group">
              <label>Type</label>
              <select className="form-select form-select-sm" value={chartType} onChange={(e) => setChartType(e.target.value)}>
                {CHART_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>X Axis</label>
              <select className="form-select form-select-sm" value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
                {allCols.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Y Axis</label>
              <select className="form-select form-select-sm" value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
                <option value="">—</option>
                {numericCols.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            {chartType !== 'Scatter' && (
              <div className="form-group">
                <label>Aggregation</label>
                <select className="form-select form-select-sm" value={aggregation} onChange={(e) => setAggregation(e.target.value)}>
                  {AGGREGATIONS.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
            )}
          </div>
          {renderChart()}
        </>
      )}
    </div>
  )
}
