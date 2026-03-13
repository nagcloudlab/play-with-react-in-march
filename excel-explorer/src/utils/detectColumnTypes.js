/**
 * Detect column types from row data.
 * Samples up to 100 rows to infer type per column.
 * Returns an array of column metadata objects.
 */
export function detectColumnTypes(rows) {
  if (!rows || rows.length === 0) return []

  const columns = Object.keys(rows[0])
  const sampleSize = Math.min(rows.length, 100)
  const sample = rows.slice(0, sampleSize)

  return columns.map((name) => {
    let numberCount = 0
    let dateCount = 0
    let nullCount = 0
    const uniqueValues = new Set()

    for (const row of sample) {
      const val = row[name]
      if (val === null || val === undefined || val === '') {
        nullCount++
        continue
      }
      uniqueValues.add(val)
      if (val instanceof Date) {
        dateCount++
      } else if (typeof val === 'number' || (typeof val === 'string' && !isNaN(Number(val)) && val.trim() !== '')) {
        numberCount++
      }
    }

    const nonNull = sampleSize - nullCount
    let type = 'string'
    if (nonNull > 0) {
      if (dateCount / nonNull > 0.5) type = 'date'
      else if (numberCount / nonNull > 0.5) type = 'number'
    }

    // For full unique count, scan all rows (for categorical detection)
    const allUnique = new Set()
    if (type === 'string') {
      for (const row of rows) {
        const val = row[name]
        if (val !== null && val !== undefined && val !== '') {
          allUnique.add(val)
        }
        if (allUnique.size > 20) break // stop early if too many
      }
    }

    let min = null
    let max = null
    if (type === 'number') {
      for (const row of sample) {
        const val = Number(row[name])
        if (!isNaN(val)) {
          if (min === null || val < min) min = val
          if (max === null || val > max) max = val
        }
      }
    }
    if (type === 'date') {
      for (const row of sample) {
        const val = row[name]
        if (val instanceof Date) {
          const t = val.getTime()
          if (min === null || t < min) min = t
          if (max === null || t > max) max = t
        }
      }
      if (min !== null) min = new Date(min)
      if (max !== null) max = new Date(max)
    }

    return {
      name,
      type,
      uniqueCount: type === 'string' ? allUnique.size : uniqueValues.size,
      uniqueValues: type === 'string' && allUnique.size <= 20 ? [...allUnique].sort() : null,
      min,
      max,
      nullCount,
    }
  })
}
