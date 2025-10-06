/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns8)'];

  // Defensive: find the grid-layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const gridChildren = Array.from(grid.children);

  // For this source, there are two columns visually: left (h2), right (paragraph + button)
  // Screenshot confirms a 2-column layout
  // Column 1: h2
  // Column 2: paragraph + button

  // Defensive: find the h2 (left column)
  const h2 = gridChildren.find((el) => el.tagName === 'H2');

  // Defensive: find the right column (the div with paragraph and button)
  const rightDiv = gridChildren.find((el) => el.tagName === 'DIV');

  // Compose the second row with two columns
  const secondRow = [h2, rightDiv].map((el) => el || document.createElement('div'));

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
