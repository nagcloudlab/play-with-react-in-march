export default function NumericFilter({ column, value, onChange }) {
  const range = value || { min: '', max: '' }

  function handleChange(field, val) {
    onChange(column.name, { ...range, [field]: val })
  }

  return (
    <div className="filter-group">
      <label>{column.name}</label>
      <div className="d-flex gap-1">
        <input
          type="number"
          className="form-control form-control-sm"
          placeholder="Min"
          value={range.min}
          onChange={(e) => handleChange('min', e.target.value)}
        />
        <input
          type="number"
          className="form-control form-control-sm"
          placeholder="Max"
          value={range.max}
          onChange={(e) => handleChange('max', e.target.value)}
        />
      </div>
    </div>
  )
}
