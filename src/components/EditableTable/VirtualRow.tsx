import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableRow, startEdit, updateCell, saveEdit, cancelEdit, undoEdit } from '../../features/tableSlice';
import { RootState } from '../../store';

interface VirtualRowProps {
  row: TableRow;
}

const VirtualRow: React.FC<VirtualRowProps> = ({ row }) => {
  const dispatch = useDispatch();
  const editCache = useSelector((state: RootState) => state.table.editCache[row.id]);
  const isEditing = !!editCache;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateCell({ id: row.id, field: name, value }));
  };

  return (
    <tr className="table-row">
      <td>{row.id}</td>
      <td>
        {isEditing ? (
          <input
            name="name"
            className="edit-input"
            value={editCache?.name ?? row.name}
            onChange={handleChange}
          />
        ) : (
          row.name
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            name="email"
            className="edit-input"
            value={editCache?.email ?? row.email}
            onChange={handleChange}
          />
        ) : (
          row.email
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            name="salary"
            type="number"
            className="edit-input"
            value={editCache?.salary ?? row.salary}
            onChange={handleChange}
          />
        ) : (
          row.salary
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            name="quantity"
            type="number"
            className="edit-input"
            value={editCache?.quantity ?? row.quantity}
            onChange={handleChange}
          />
        ) : (
          row.quantity
        )}
      </td>
      <td className='btn-space'>
        {isEditing ? (
          <>
            <button className="btn btn-sm btn-success btn-premium action-btn" onClick={() => dispatch(saveEdit(row.id))}>Save</button>
            <button className="btn btn-sm btn-secondary btn-premium action-btn" onClick={() => dispatch(cancelEdit(row.id))}>Cancel</button>
            <button className="btn btn-sm btn-warning btn-premium action-btn" onClick={() => dispatch(undoEdit(row.id))}>Undo</button>
          </>
        ) : (
          <button className="btn btn-sm btn-primary btn-premium action-btn" onClick={() => dispatch(startEdit(row.id))}>Edit</button>
        )}
      </td>
    </tr>
  );
};

export default VirtualRow;
