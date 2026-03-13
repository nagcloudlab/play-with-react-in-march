export default function DropdownFilter({ column, value, onChange }) {
  const selected = value || []

  function toggle(val) {
    if (selected.includes(val)) {
      onChange(column.name, selected.filter((v) => v !== val))
    } else {
      onChange(column.name, [...selected, val])
    }
  }

  function selectAll() {
    onChange(column.name, [])
  }

  return (
    <div className="filter-group">
      <label>{column.name}</label>
      {selected.length > 0 && (
        <button className="btn btn-link btn-sm p-0 mb-1" onClick={selectAll}>
          Clear
        </button>
      )}
      <div className="checkbox-list">
        {column.uniqueValues.map((val) => (
          <div className="form-check" key={String(val)}>
            <input
              className="form-check-input"
              type="checkbox"
              id={`${column.name}-${val}`}
              checked={selected.length === 0 || selected.includes(val)}
              onChange={() => toggle(val)}
            />
            <label className="form-check-label" htmlFor={`${column.name}-${val}`}>
              {val === null ? '(empty)' : String(val)}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}
