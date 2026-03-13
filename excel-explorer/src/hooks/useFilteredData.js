import { useMemo } from 'react'
import { applyFilters } from '../utils/filterEngine'
import { evaluateQuery } from '../utils/queryParser'

const PAGE_SIZE = 50

/**
 * Memoized pipeline: filter → query → sort → paginate.
 */
export function useFilteredData(rows, filters, query, columnMeta, sortConfig, page) {
  const filtered = useMemo(() => {
    if (!rows || rows.length === 0) return []
    return applyFilters(rows, filters, columnMeta)
  }, [rows, filters, columnMeta])

  const queried = useMemo(() => {
    if (!query || !query.trim()) return filtered
    try {
      return filtered.filter((row) => evaluateQuery(query, row))
    } catch {
      return filtered // on parse error, return unfiltered
    }
  }, [filtered, query])

  const sorted = useMemo(() => {
    if (!sortConfig || !sortConfig.column) return queried
    const { column, direction } = sortConfig
    const mult = direction === 'asc' ? 1 : -1
    return [...queried].sort((a, b) => {
      const va = a[column]
      const vb = b[column]
      if (va === null || va === undefined) return 1
      if (vb === null || vb === undefined) return -1
      if (va instanceof Date && vb instanceof Date) return mult * (va.getTime() - vb.getTime())
      if (typeof va === 'number' && typeof vb === 'number') return mult * (va - vb)
      return mult * String(va).localeCompare(String(vb))
    })
  }, [queried, sortConfig])

  const totalFiltered = sorted.length
  const totalPages = Math.max(1, Math.ceil(totalFiltered / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * PAGE_SIZE
  const pageRows = sorted.slice(start, start + PAGE_SIZE)

  return { pageRows, totalFiltered, totalPages, currentPage: safePage, allFiltered: sorted }
}
