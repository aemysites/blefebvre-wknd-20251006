/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container inside the footer
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Only proceed if we have columns
  if (!columns.length) return;

  // Header row as per block requirements
  const headerRow = ['Columns block (columns21)'];

  // Second row: each cell is the content of a column
  // We want to preserve the original elements, not clones
  const secondRow = columns.map((col) => col);

  // Compose the table
  const rows = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
