// src/utils/excelExport.js — Robust Excel (.xlsx) Exporter using SheetJS
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

/**
 * Export arbitrary dataset to formatted .xlsx file
 * @param {Array<Object>} data - Array of row objects
 * @param {string} fileName - Target file name prefix (e.g., 'GNC_Placements')
 * @param {string} sheetName - Sheet tab name (default: 'Data')
 */
export function exportToExcel(data, fileName = 'GNC_Export', sheetName = 'Report') {
  try {
    if (!data || !data.length) {
      toast.error('No data available to export');
      return;
    }

    // Create a new worksheet from JSON data
    const ws = XLSX.utils.json_to_sheet(data);

    // Calculate dynamic column widths based on contents
    const colWidths = Object.keys(data[0] || {}).map(key => {
      let maxLen = key.length;
      data.forEach(row => {
        const val = row[key];
        if (val !== null && val !== undefined) {
          const str = String(val);
          if (str.length > maxLen) maxLen = Math.min(str.length, 50);
        }
      });
      return { wch: Math.max(maxLen + 3, 12) };
    });
    ws['!cols'] = colWidths;

    // Create workbook and append sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Generate date stamp
    const dateStr = new Date().toISOString().slice(0, 10);
    const fullFileName = `${fileName}_${dateStr}.xlsx`;

    // Trigger download
    XLSX.writeFile(wb, fullFileName);
    toast.success(`Exported ${data.length} records to ${fullFileName}`);
  } catch (err) {
    console.error('Failed to export excel:', err);
    toast.error('Failed to export Excel file');
  }
}
