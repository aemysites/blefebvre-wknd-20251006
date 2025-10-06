/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns15)'];

  // Defensive: find the grid layout container (columns)
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get all immediate children of the grid as columns
    const colEls = Array.from(grid.querySelectorAll(':scope > div'));
    if (colEls.length) {
      // Each column: use the whole element as the cell
      columns = colEls.map((col) => col);
    }
  }

  // Fallback: if no grid found, treat all children as columns
  if (columns.length === 0) {
    columns = Array.from(element.children);
  }

  // Only one content row, with as many columns as found
  const contentRow = columns;

  // Table: header row, then content row
  const tableCells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
