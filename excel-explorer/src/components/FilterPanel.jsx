import TextFilter from './filters/TextFilter'
import NumericFilter from './filters/NumericFilter'
import DropdownFilter from './filters/DropdownFilter'
import DateFilter from './filters/DateFilter'
import QueryInput from './filters/QueryInput'

export default function FilterPanel({ columns, filters, onFilterChange, query, onQueryChange }) {
  function renderFilter(col) {
    switch (col.type) {
      case 'number':
        return <NumericFilter key={col.name} column={col} value={filters[col.name]} onChange={onFilterChange} />
      case 'date':
        return <DateFilter key={col.name} column={col} value={filters[col.name]} onChange={onFilterChange} />
      case 'string':
        if (col.uniqueValues && col.uniqueCount <= 20) {
          return <DropdownFilter key={col.name} column={col} value={filters[col.name]} onChange={onFilterChange} />
        }
        return <TextFilter key={col.name} column={col} value={filters[col.name]} onChange={onFilterChange} />
      default:
        return <TextFilter key={col.name} column={col} value={filters[col.name]} onChange={onFilterChange} />
    }
  }

  function clearAll() {
    for (const col of columns) {
      onFilterChange(col.name, col.type === 'number' ? { min: '', max: '' } : col.type === 'date' ? { from: '', to: '' } : col.uniqueValues ? [] : '')
    }
    onQueryChange('')
  }

  return (
    <div className="filter-sidebar">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0">Filters</h6>
        <button className="btn btn-link btn-sm p-0" onClick={clearAll}>
          Clear All
        </button>
      </div>
      <QueryInput query={query} onQueryChange={onQueryChange} columns={columns} />
      {columns.map(renderFilter)}
    </div>
  )
}
