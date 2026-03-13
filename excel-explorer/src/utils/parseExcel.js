import * as XLSX from 'xlsx'

/**
 * Parse an Excel file (ArrayBuffer) into structured data.
 * Returns { sheetNames, sheets } where sheets is a map of sheetName → rows.
 */
export function parseExcel(arrayBuffer) {
  const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true })
  const sheetNames = workbook.SheetNames

  const sheets = {}
  for (const name of sheetNames) {
    const worksheet = workbook.Sheets[name]
    const rows = XLSX.utils.sheet_to_json(worksheet, { defval: null })
    sheets[name] = rows
  }

  return { sheetNames, sheets }
}

/**
 * Read a File object and return parsed Excel data.
 */
export function readExcelFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const result = parseExcel(e.target.result)
        resolve(result)
      } catch (err) {
        reject(err)
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsArrayBuffer(file)
  })
}
