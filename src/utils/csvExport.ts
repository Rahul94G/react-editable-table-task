import { TableRow } from '../features/tableSlice';
import Papa from 'papaparse';

/**
 * Export an array of TableRow objects to a CSV file and trigger download.
 * The CSV includes all columns defined in TableRow.
 */
export function exportToCsv(rows: TableRow[]) {
  if (!rows || rows.length === 0) {
    console.warn('No data to export');
    return;
  }
  const csv = Papa.unparse(rows);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'table_export.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
