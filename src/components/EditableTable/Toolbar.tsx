import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setFilter, clearFilters, clearSort } from '../../features/tableSlice';
import { exportToCsv } from '../../utils/csvExport';

const Toolbar: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.table.filters);
  const sort = useSelector((state: RootState) => state.table.sort);
  const rows = useSelector((state: RootState) => state.table.rows);

  const [nameFilter, setNameFilter] = useState(filters.name?.toString() || '');
  const [emailFilter, setEmailFilter] = useState(filters.email?.toString() || '');
  const [salaryFilter, setSalaryFilter] = useState(filters.salary?.toString() || '');
  const [quantityFilter, setQuantityFilter] = useState(filters.quantity?.toString() || '');

  const applyFilters = () => {
    dispatch(setFilter({ column: 'name', value: nameFilter }));
    dispatch(setFilter({ column: 'email', value: emailFilter }));
    dispatch(setFilter({ column: 'salary', value: salaryFilter }));
    dispatch(setFilter({ column: 'quantity', value: quantityFilter }));
  };

  const clearAll = () => {
    setNameFilter('');
    setEmailFilter('');
    setSalaryFilter('');
    setQuantityFilter('');
    dispatch(clearFilters());
    dispatch(clearSort());
  };



  const handleExport = () => {
    exportToCsv(rows);
  };

  return (
    <div className="toolbar d-flex flex-wrap align-items-center mb-3 gap-2">
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Filter Name"
        value={nameFilter}
        onChange={e => setNameFilter(e.target.value)}
        style={{ maxWidth: '150px' }}
      />
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Filter Email"
        value={emailFilter}
        onChange={e => setEmailFilter(e.target.value)}
        style={{ maxWidth: '150px' }}
      />
      <input
        type="number"
        className="form-control form-control-sm"
        placeholder="Filter Salary"
        value={salaryFilter}
        onChange={e => setSalaryFilter(e.target.value)}
        style={{ maxWidth: '120px' }}
      />
      <input
        type="number"
        className="form-control form-control-sm"
        placeholder="Filter Qty"
        value={quantityFilter}
        onChange={e => setQuantityFilter(e.target.value)}
        style={{ maxWidth: '120px' }}
      />
      <button className="btn btn-sm btn-primary btn-premium" onClick={applyFilters}>Apply</button>
      <button className="btn btn-sm btn-secondary btn-premium" onClick={clearAll}>Clear Filters</button>
      <button className="btn btn-sm btn-outline-success btn-premium ms-auto" onClick={handleExport}>Export CSV</button>
    </div>
  );
};

export default Toolbar;
