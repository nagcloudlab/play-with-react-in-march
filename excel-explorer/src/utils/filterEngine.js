/**
 * Apply column filters to rows. All filters are AND-combined.
 * filters is an object: { columnName: filterValue, ... }
 * columnMeta is an array of { name, type } from detectColumnTypes.
 */
export function applyFilters(rows, filters, columnMeta) {
  if (!rows || rows.length === 0) return rows

  const metaMap = {}
  for (const col of columnMeta) {
    metaMap[col.name] = col
  }

  const activeFilters = Object.entries(filters).filter(([, val]) => {
    if (val === null || val === undefined) return false
    if (typeof val === 'string' && val.trim() === '') return false
    if (Array.isArray(val) && val.length === 0) return false
    if (typeof val === 'object' && !Array.isArray(val)) {
      return val.min !== '' || val.max !== '' || val.from !== '' || val.to !== ''
    }
    return true
  })

  if (activeFilters.length === 0) return rows

  return rows.filter((row) => {
    return activeFilters.every(([colName, filterVal]) => {
      const cellVal = row[colName]
      const meta = metaMap[colName]
      if (!meta) return true

      switch (meta.type) {
        case 'string': {
          if (Array.isArray(filterVal)) {
            // Dropdown multi-select
            if (filterVal.length === 0) return true
            return filterVal.includes(cellVal)
          }
          // Text search
          if (typeof filterVal === 'string' && filterVal.trim()) {
            if (cellVal === null || cellVal === undefined) return false
            return String(cellVal).toLowerCase().includes(filterVal.toLowerCase())
          }
          return true
        }
        case 'number': {
          if (typeof filterVal !== 'object' || Array.isArray(filterVal)) return true
          const num = Number(cellVal)
          if (isNaN(num)) return false
          if (filterVal.min !== '' && filterVal.min !== null && filterVal.min !== undefined) {
            if (num < Number(filterVal.min)) return false
          }
          if (filterVal.max !== '' && filterVal.max !== null && filterVal.max !== undefined) {
            if (num > Number(filterVal.max)) return false
          }
          return true
        }
        case 'date': {
          if (typeof filterVal !== 'object' || Array.isArray(filterVal)) return true
          if (!(cellVal instanceof Date)) return false
          const t = cellVal.getTime()
          if (filterVal.from) {
            if (t < new Date(filterVal.from).getTime()) return false
          }
          if (filterVal.to) {
            const toEnd = new Date(filterVal.to)
            toEnd.setHours(23, 59, 59, 999)
            if (t > toEnd.getTime()) return false
          }
          return true
        }
        default:
          return true
      }
    })
  })
}
