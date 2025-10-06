/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Header row as required
  const headerRow = ['Columns (columns38)'];

  // Find the main grid containing the two columns
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  if (!mainGrid) return;

  // Get immediate children of the main grid (should be two: left and right columns)
  const columns = Array.from(mainGrid.children);
  if (columns.length < 2) return;

  // Left column: text and buttons
  const leftCol = columns[0];
  // Right column: images
  const rightCol = columns[1];

  // --- LEFT COLUMN ---
  // Gather heading, subheading, and button group
  const heading = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');

  // Compose left cell content
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // --- RIGHT COLUMN ---
  // Find the grid of images inside rightCol
  const imageGrid = rightCol.querySelector('.grid-layout.mobile-portrait-1-column');
  let rightCellContent = [];
  if (imageGrid) {
    // Get all images
    const images = Array.from(imageGrid.querySelectorAll('img'));
    // Each image should be in its own cell for columns block
    rightCellContent = images.map(img => [img]);
  }

  // Compose the table rows
  // The second row should have as many columns as there are content groups
  // If rightCellContent has multiple images, each should be a separate column
  const secondRow = [leftCellContent].concat(rightCellContent.length ? rightCellContent : [[]]);

  const tableRows = [
    headerRow,
    secondRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
