# Advanced Editable Data Table

An advanced editable data table component built with React, Redux Toolkit, and TypeScript. This project handles large datasets efficiently while providing a premium user experience.

## Features

- **Inline Editing:** Edit text and numeric fields directly in the table row.
- **Action Controls:** Each row has Save, Cancel, and Undo options to revert unsaved edits.
- **Large Dataset Handling:** Capable of handling 10,000+ rows efficiently. Uses pagination (25 rows/page) to maintain high performance.
- **Sorting & Filtering:** Multi-column sorting (clicking table headers) and filtering (via toolbar).
- **Responsive Premium UI:** Mobile-friendly design using Bootstrap alongside custom CSS (gradient premium buttons, hover effects, subtle shadows).
- **CSV Export:** Easily export current filtered data to a CSV file.

## Setup Instructions

1. Ensure you have Node.js installed.
2. Navigate to the project directory:
   ```bash
   cd task
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to the URL displayed in your terminal (usually `http://localhost:3000` or `http://localhost:3002`).

## Approach and Decisions Taken

- **State Management (Redux Toolkit):** Chose Redux Toolkit for centralized state management due to the complexity of holding 10,000 rows, applying filters/sorts globally, and managing per-row edit/undo caches without complex prop drilling.
- **Performance (Pagination over Virtualization):** Initially evaluated `react-window` for virtual scrolling, but it conflicted visually with Bootstrap's responsive table classes. Pagination was chosen as it's cleaner, easier to style, and perfectly handles the 10,000-row dataset by only rendering 25 DOM rows at a time.
- **Sorting Location:** Moved sorting from separate toolbar buttons to the actual table headers (`<thead><th>`) as this is the universally recognized UX standard for data tables.
- **Data Export (`papaparse`):** Used PapaParse for quick, robust, and reliable conversion of the JSON row data into a downloadable CSV file.

## Known Limitations

- **Undo Capability:** The undo stack currently only stores snapshots of the row from the *start* of the edit session. It does not support character-by-character undo (Ctrl+Z behavior).
- **In-Memory Operations:** All data, filtering, and sorting happens entirely on the client side. While perfectly fine for 10,000 rows, a significantly larger dataset (e.g. 1 million rows) would require server-side pagination and processing.
