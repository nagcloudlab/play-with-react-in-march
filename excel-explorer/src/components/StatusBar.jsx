export default function StatusBar({ totalRows, filteredCount, fileName, onLoadNew }) {
  return (
    <div className="status-bar">
      <span>
        Showing <strong>{filteredCount}</strong> of <strong>{totalRows}</strong> rows
        {fileName && <span className="text-muted ms-2">— {fileName}</span>}
      </span>
      <button className="btn btn-outline-secondary btn-sm" onClick={onLoadNew}>
        Load New File
      </button>
    </div>
  )
}
