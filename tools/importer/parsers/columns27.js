/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (the columns container)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are visually the columns)
  const columnElements = Array.from(grid.children);

  // The first two children are the two columns: left (text) and right (quote)
  const leftCol = columnElements[0];
  const rightCol = columnElements[1];
  const nestedGrid = columnElements[2];

  // Defensive: check that we have the expected structure
  if (!leftCol || !rightCol || !nestedGrid || !nestedGrid.classList.contains('w-layout-grid')) return;

  // The nested grid contains the bottom row: divider, avatar block, logo block
  const nestedChildren = Array.from(nestedGrid.children);
  // divider is just a visual line, skip it
  // avatar block (author info)
  const avatarBlock = nestedChildren.find(el => el.classList.contains('flex-horizontal'));
  // logo block (rightmost, may be empty)
  const logoBlock = nestedChildren.find(el => el.classList.contains('utility-display-inline-block'));

  // Compose table rows
  const headerRow = ['Columns (columns27)'];
  const secondRow = [leftCol, rightCol];
  const thirdRow = [avatarBlock || '', logoBlock || ''];

  // Build the table
  const rows = [headerRow, secondRow, thirdRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
