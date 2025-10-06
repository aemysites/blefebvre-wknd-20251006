/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container (holds both text+contacts and image)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // There should be two main columns visually: left (text + contacts), right (image)
  // Find the text/contacts column (the one with headings)
  let leftCol = null;
  let contactsList = null;
  let rightColImg = null;

  // Find the left column (contains h2/h3/p)
  for (const child of gridChildren) {
    if (child.querySelector('h2') && child.querySelector('h3')) {
      leftCol = child;
    }
    if (child.tagName === 'UL') {
      contactsList = child;
    }
    if (child.tagName === 'IMG') {
      rightColImg = child;
    }
  }

  // Compose left column: headings + contacts list
  const leftColContent = [];
  if (leftCol) leftColContent.push(leftCol);
  if (contactsList) leftColContent.push(contactsList);

  // Compose right column: image
  const rightColContent = rightColImg ? [rightColImg] : [];

  // Table header
  const headerRow = ['Columns (columns9)'];
  // Table content row: two columns
  const contentRow = [leftColContent, rightColContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
