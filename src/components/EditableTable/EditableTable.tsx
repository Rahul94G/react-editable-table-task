import React, { useEffect, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useDispatch, useSelector } from 'react-redux';
import { setRows, TableRow, setSort } from '../../features/tableSlice';
import { RootState } from '../../store';
import { generateMockData } from '../../mockData';
import VirtualRow from './VirtualRow';
import Toolbar from './Toolbar';
import PaginationControls from './PaginationControls';

const PAGE_SIZE = 25;

const EditableTable: React.FC = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state: RootState) => state.table.rows);
  const filters = useSelector((state: RootState) => state.table.filters);
  const sort = useSelector((state: RootState) => state.table.sort);

  // Load mock data once
  useEffect(() => {
    const data = generateMockData(10000).map(r => ({
      id: r.id.toString(),
      name: r.name,
      email: r.email,
      salary: r.salary,
      quantity: r.quantity,
    }));
    dispatch(setRows(data as unknown as TableRow[]));
  }, [dispatch]);

  // Apply filters & sorting
  const processedRows = useMemo(() => {
    let result = rows;
    // filtering
    if (Object.keys(filters).length) {
      result = result.filter(row => {
        return Object.entries(filters).every(([col, val]) => {
          const cell = row[col as keyof typeof row];
          if (typeof cell === 'number') {
            return cell === Number(val);
          }
          return String(cell).toLowerCase().includes(String(val).toLowerCase());
        });
      });
    }
    // sorting
    if (sort) {
      const { column, direction } = sort;
      result = [...result].sort((a, b) => {
        const av = a[column as keyof typeof a];
        const bv = b[column as keyof typeof b];
        if (av < bv) return direction === 'asc' ? -1 : 1;
        if (av > bv) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }, [rows, filters, sort]);

  // Pagination state (fallback when virtual scroll disabled)
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    setPage(1);
  }, [filters, sort]);

  const pagedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return processedRows.slice(start, start + PAGE_SIZE);
  }, [processedRows, page]);

  // For better control, disable virtual scrolling and always use pagination
  const useVirtual = false;
  const displayRows = useVirtual ? processedRows : pagedRows;

  return (
    <div className="editable-table-container p-3 shadow rounded">
      <Toolbar />
      <div className="table-responsive" style={{ height: useVirtual ? 600 : 'auto' }}>
        {useVirtual ? (
          <List
            height={600}
            itemCount={displayRows.length}
            itemSize={45}
            width="100%"
          >
            {({ index, style }: { index: number; style: React.CSSProperties }) => (
              <div style={style}>
                <VirtualRow row={displayRows[index]} />
              </div>
            )}
          </List>
        ) : (
          <table className="table table-striped table-hover">
            <thead className="table-header">
              <tr>
                <th>ID</th>
                <th style={{ cursor: 'pointer' }} onClick={() => dispatch(setSort({ column: 'name', direction: sort?.column === 'name' && sort.direction === 'asc' ? 'desc' : 'asc' }))}>
                  Name {sort?.column === 'name' ? (sort.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th>Email</th>
                <th style={{ cursor: 'pointer' }} onClick={() => dispatch(setSort({ column: 'salary', direction: sort?.column === 'salary' && sort.direction === 'asc' ? 'desc' : 'asc' }))}>
                  Salary {sort?.column === 'salary' ? (sort.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th style={{ cursor: 'pointer' }} onClick={() => dispatch(setSort({ column: 'quantity', direction: sort?.column === 'quantity' && sort.direction === 'asc' ? 'desc' : 'asc' }))}>
                  Quantity {sort?.column === 'quantity' ? (sort.direction === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayRows.map(row => (
                <VirtualRow key={row.id} row={row} />
              ))}
            </tbody>
          </table>
        )}
      </div>
      {!useVirtual && (
        <PaginationControls
          total={processedRows.length}
          pageSize={PAGE_SIZE}
          currentPage={page}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default EditableTable;
