export default function DateFilter({ column, value, onChange }) {
  const range = value || { from: '', to: '' }

  function handleChange(field, val) {
    onChange(column.name, { ...range, [field]: val })
  }

  return (
    <div className="filter-group">
      <label>{column.name}</label>
      <div className="d-flex gap-1">
        <input
          type="date"
          className="form-control form-control-sm"
          value={range.from}
          onChange={(e) => handleChange('from', e.target.value)}
        />
        <input
          type="date"
          className="form-control form-control-sm"
          value={range.to}
          onChange={(e) => handleChange('to', e.target.value)}
        />
      </div>
    </div>
  )
}
