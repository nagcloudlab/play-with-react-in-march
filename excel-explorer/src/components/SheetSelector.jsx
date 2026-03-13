export default function SheetSelector({ sheetNames, activeSheet, onSheetChange }) {
  if (!sheetNames || sheetNames.length <= 1) return null

  return (
    <div className="sheet-selector">
      <label className="form-label mb-0 fw-bold" style={{ fontSize: '0.85rem' }}>Sheet:</label>
      <select
        className="form-select form-select-sm"
        style={{ width: 'auto' }}
        value={activeSheet}
        onChange={(e) => onSheetChange(e.target.value)}
      >
        {sheetNames.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    </div>
  )
}
