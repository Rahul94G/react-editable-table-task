import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TableRow {
  id: string;
  name: string;
  email: string;
  salary: number;
  quantity: number;
  [key: string]: any;
}

interface TableState {
  rows: TableRow[];
  editCache: Record<string, Partial<TableRow>>; // unsaved edits per row
  undoStack: Record<string, TableRow[]>; // history per row
  filters: Record<string, string | number>;
  sort: { column: keyof TableRow; direction: 'asc' | 'desc' } | null;
}

const initialState: TableState = {
  rows: [],
  editCache: {},
  undoStack: {},
  filters: {},
  sort: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows(state, action: PayloadAction<TableRow[]>) {
      state.rows = action.payload;
    },
    startEdit(state, action: PayloadAction<string>) {
      const id = action.payload;
      const row = state.rows.find(r => r.id === id);
      if (row) {
        state.editCache[id] = { ...row };
        if (!state.undoStack[id]) state.undoStack[id] = [];
        state.undoStack[id].push({ ...row });
      }
    },
    updateCell(state, action: PayloadAction<{ id: string; field: string; value: any }>) {
      const { id, field, value } = action.payload;
      if (!state.editCache[id]) return;
      const parsed = typeof value === 'string' && !isNaN(Number(value)) ? Number(value) : value;
      state.editCache[id][field] = parsed;
    },
    saveEdit(state, action: PayloadAction<string>) {
      const id = action.payload;
      const edited = state.editCache[id];
      if (!edited) return;
      const idx = state.rows.findIndex(r => r.id === id);
      if (idx >= 0) {
        state.rows[idx] = { ...state.rows[idx], ...edited } as TableRow;
      }
      delete state.editCache[id];
    },
    cancelEdit(state, action: PayloadAction<string>) {
      delete state.editCache[action.payload];
    },
    undoEdit(state, action: PayloadAction<string>) {
      const id = action.payload;
      const stack = state.undoStack[id];
      if (stack && stack.length > 0) {
        const previous = stack.pop();
        if (previous) {
          const idx = state.rows.findIndex(r => r.id === id);
          if (idx >= 0) state.rows[idx] = previous;
          delete state.editCache[id];
        }
      }
    },
    setFilter(state, action: PayloadAction<{ column: string; value: string | number }>) {
      const { column, value } = action.payload;
      if (value === '' || value === null) delete state.filters[column];
      else state.filters[column] = value;
    },
    clearFilters(state) {
      state.filters = {};
    },
    setSort(state, action: PayloadAction<{ column: keyof TableRow; direction: 'asc' | 'desc' }>) {
      state.sort = action.payload;
    },
    clearSort(state) {
      state.sort = null;
    },
  },
});

export const {
  setRows,
  startEdit,
  updateCell,
  saveEdit,
  cancelEdit,
  undoEdit,
  setFilter,
  clearFilters,
  setSort,
  clearSort,
} = tableSlice.actions;

export default tableSlice.reducer;
