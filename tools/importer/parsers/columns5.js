/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout.container');
  let leftCol = null;
  let rightCol = null;

  if (grid) {
    leftCol = grid.querySelector('.section');
    rightCol = element.querySelector('img');
  }

  // Compose left column content: heading, paragraph, buttons
  const leftContent = [];
  if (leftCol) {
    // Heading
    const heading = leftCol.querySelector('h2');
    if (heading) leftContent.push(heading);
    // Paragraph
    const paragraph = leftCol.querySelector('.rich-text, .w-richtext');
    if (paragraph) leftContent.push(paragraph);
    // Buttons
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) leftContent.push(buttonGroup);
  }

  // Compose right column content: image
  const rightContent = [];
  if (rightCol) {
    rightContent.push(rightCol);
  }

  // Table header
  const headerRow = ['Columns block (columns5)'];
  // Table second row: two columns, left and right
  const secondRow = [leftContent, rightContent];

  // Build table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
