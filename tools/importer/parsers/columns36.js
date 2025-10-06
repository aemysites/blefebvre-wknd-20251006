/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns36)'];

  // Defensive: find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The grid has three main children:
  // 1. The large left column (main feature)
  // 2. The upper right column (two stacked cards)
  // 3. The lower right column (list of links with dividers)
  // But in this HTML, the structure is:
  // - First child: main feature (large image, tag, heading, text)
  // - Second child: flex-horizontal with two cards (each is an <a>)
  // - Third child: flex-horizontal with multiple <a> (each is a link with heading and text, separated by dividers)

  // Get the three main columns
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // 1. Main feature (left column)
  const mainFeature = gridChildren[0];

  // 2. Two stacked cards (upper right)
  const upperRight = gridChildren[1];
  // Each child is an <a>
  const upperRightCards = Array.from(upperRight.querySelectorAll(':scope > a'));

  // 3. Lower right: list of links separated by dividers
  const lowerRight = gridChildren[2];
  // Each child is either an <a> or a divider
  const lowerRightLinks = Array.from(lowerRight.querySelectorAll(':scope > a'));

  // Compose the left column: main feature
  // We'll include the entire mainFeature <a> element
  const leftCol = mainFeature;

  // Compose the upper right column: two stacked cards
  // We'll combine both <a> elements in a fragment
  const upperRightCol = document.createElement('div');
  upperRightCards.forEach(card => upperRightCol.appendChild(card));

  // Compose the lower right column: all links (ignore dividers)
  const lowerRightCol = document.createElement('div');
  lowerRightLinks.forEach(link => lowerRightCol.appendChild(link));

  // Build the table: 3 columns in the second row
  const tableRows = [
    headerRow,
    [leftCol, upperRightCol, lowerRightCol]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
