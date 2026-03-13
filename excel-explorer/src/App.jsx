import { useState, useCallback } from 'react'
import { readExcelFile } from './utils/parseExcel'
import { detectColumnTypes } from './utils/detectColumnTypes'
import { useFilteredData } from './hooks/useFilteredData'
import UploadScreen from './components/UploadScreen'
import SheetSelector from './components/SheetSelector'
import StatusBar from './components/StatusBar'
import FilterPanel from './components/FilterPanel'
import TablePanel from './components/TablePanel'
import ChartPanel from './components/ChartPanel'

export default function App() {
  // Data state
  const [sheets, setSheets] = useState(null)
  const [sheetNames, setSheetNames] = useState([])
  const [activeSheet, setActiveSheet] = useState('')
  const [fileName, setFileName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Derived from active sheet
  const rows = sheets ? sheets[activeSheet] || [] : []
  const [columnMeta, setColumnMeta] = useState([])

  // Filter/query/sort/page state
  const [filters, setFilters] = useState({})
  const [query, setQuery] = useState('')
  const [sortConfig, setSortConfig] = useState(null)
  const [page, setPage] = useState(1)

  const { pageRows, totalFiltered, totalPages, currentPage, allFiltered } =
    useFilteredData(rows, filters, query, columnMeta, sortConfig, page)

  const handleFileLoaded = useCallback(async (file) => {
    setLoading(true)
    setError('')
    try {
      const result = await readExcelFile(file)
      setSheets(result.sheets)
      setSheetNames(result.sheetNames)
      const firstSheet = result.sheetNames[0]
      setActiveSheet(firstSheet)
      setFileName(file.name)

      const meta = detectColumnTypes(result.sheets[firstSheet])
      setColumnMeta(meta)

      // Reset filters
      setFilters({})
      setQuery('')
      setSortConfig(null)
      setPage(1)
    } catch (err) {
      setError(err.message || 'Failed to parse file')
    } finally {
      setLoading(false)
    }
  }, [])

  function handleSheetChange(sheetName) {
    setActiveSheet(sheetName)
    const meta = detectColumnTypes(sheets[sheetName])
    setColumnMeta(meta)
    setFilters({})
    setQuery('')
    setSortConfig(null)
    setPage(1)
  }

  function handleFilterChange(colName, value) {
    setFilters((prev) => ({ ...prev, [colName]: value }))
    setPage(1)
  }

  function handleLoadNew() {
    setSheets(null)
    setSheetNames([])
    setActiveSheet('')
    setFileName('')
    setColumnMeta([])
    setFilters({})
    setQuery('')
    setSortConfig(null)
    setPage(1)
  }

  // Upload screen
  if (!sheets) {
    return (
      <>
        {loading && (
          <div className="upload-screen">
            <div className="text-center">
              <div className="spinner-border text-primary mb-3" role="status" />
              <p>Parsing Excel file...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="upload-screen">
            <div className="text-center">
              <div className="alert alert-danger">{error}</div>
              <button className="btn btn-primary" onClick={handleLoadNew}>Try Again</button>
            </div>
          </div>
        )}
        {!loading && !error && <UploadScreen onFileLoaded={handleFileLoaded} />}
      </>
    )
  }

  // Main explorer layout
  return (
    <div className="app-layout">
      <FilterPanel
        columns={columnMeta}
        filters={filters}
        onFilterChange={handleFilterChange}
        query={query}
        onQueryChange={(q) => { setQuery(q); setPage(1) }}
      />
      <div className="main-content">
        <StatusBar
          totalRows={rows.length}
          filteredCount={totalFiltered}
          fileName={fileName}
          onLoadNew={handleLoadNew}
        />
        {sheetNames.length > 1 && (
          <div className="px-3 pt-2">
            <SheetSelector
              sheetNames={sheetNames}
              activeSheet={activeSheet}
              onSheetChange={handleSheetChange}
            />
          </div>
        )}
        <TablePanel
          rows={pageRows}
          columns={columnMeta}
          sortConfig={sortConfig}
          onSort={setSortConfig}
          page={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
        <ChartPanel data={allFiltered} columns={columnMeta} />
      </div>
    </div>
  )
}
