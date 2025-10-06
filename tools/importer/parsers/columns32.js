/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main column divs (left and right)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text content
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // --- Left column content ---
  // Gather all children except the image block (which is in its own column)
  // We'll include all children except the last one if it's an image
  const leftColChildren = Array.from(leftCol.children);
  let leftContent = [];
  for (let i = 0; i < leftColChildren.length; i++) {
    // If this child is the image block, skip
    if (leftColChildren[i].querySelector('img')) continue;
    leftContent.push(leftColChildren[i]);
  }
  // If nothing was found, fallback to all children
  if (leftContent.length === 0) leftContent = leftColChildren;

  // --- Right column content ---
  // The rightCol contains only the image
  const rightColImage = rightCol.querySelector('img');

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns32)'];
  // Table row: left column content (as array), right column image (as element)
  const contentRow = [leftContent, rightColImage];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
