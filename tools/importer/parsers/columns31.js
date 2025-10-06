/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If no columns, fallback to single cell with empty content
  const numColumns = columns.length > 0 ? columns.length : 1;

  // Table header row (block name)
  const headerRow = ['Columns (columns31)'];

  // Second row: each column's content (reference the actual element, not clone)
  const contentRow = columns.map((col) => col);

  // Only include content if columns exist, otherwise create an empty cell
  const tableRows = [headerRow, contentRow.length ? contentRow : Array(numColumns).fill(document.createElement('div'))];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
