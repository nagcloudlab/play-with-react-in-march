export default function TextFilter({ column, value, onChange }) {
  return (
    <div className="filter-group">
      <label>{column.name}</label>
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder={`Search ${column.name}...`}
        value={value || ''}
        onChange={(e) => onChange(column.name, e.target.value)}
      />
    </div>
  )
}
