/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (the columns container)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get immediate children of the grid (should be two: left content, right image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: content block (text, headings, button)
  const leftCol = gridChildren[0];
  // Second column: image
  const rightCol = gridChildren[1];

  // Table header row
  const headerRow = ['Columns block (columns28)'];
  // Table content row: two columns
  const contentRow = [leftCol, rightCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original section with the new table
  element.replaceWith(table);
}
