export default function TablePanel({ rows, columns, sortConfig, onSort, page, totalPages, onPageChange }) {
  function handleSort(colName) {
    if (sortConfig && sortConfig.column === colName) {
      onSort({
        column: colName,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      })
    } else {
      onSort({ column: colName, direction: 'asc' })
    }
  }

  function sortIndicator(colName) {
    if (!sortConfig || sortConfig.column !== colName) return null
    return (
      <span className="sort-arrow active">
        {sortConfig.direction === 'asc' ? '\u25B2' : '\u25BC'}
      </span>
    )
  }

  function formatCell(value) {
    if (value === null || value === undefined) return ''
    if (value instanceof Date) {
      return value.toLocaleDateString()
    }
    return String(value)
  }

  const colNames = columns.map((c) => c.name)

  return (
    <>
      <div className="table-section">
        <table className="table table-striped table-hover table-bordered data-table">
          <thead>
            <tr>
              {colNames.map((name) => (
                <th key={name} onClick={() => handleSort(name)}>
                  {name}
                  {sortIndicator(name)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={colNames.length} className="text-center text-muted py-4">
                  No rows match your filters
                </td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr key={i}>
                  {colNames.map((name) => (
                    <td key={name} title={formatCell(row[name])}>
                      {formatCell(row[name])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            className="btn btn-sm btn-outline-secondary"
            disabled={page <= 1}
            onClick={() => onPageChange(1)}
          >
            &laquo;
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            &lsaquo;
          </button>
          <span className="page-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-sm btn-outline-secondary"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
          >
            &rsaquo;
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            disabled={page >= totalPages}
            onClick={() => onPageChange(totalPages)}
          >
            &raquo;
          </button>
        </div>
      )}
    </>
  )
}
