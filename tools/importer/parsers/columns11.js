/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that holds the two primary columns
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  const columns = Array.from(mainGrid.children);

  // Defensive: Expecting two columns in the main grid
  const leftCol = columns[0];
  const rightCol = columns[1];

  // LEFT COLUMN: Eyebrow and heading
  const leftColContent = [];
  if (leftCol) {
    const eyebrow = leftCol.querySelector('.eyebrow');
    if (eyebrow) leftColContent.push(eyebrow);
    const heading = leftCol.querySelector('h1');
    if (heading) leftColContent.push(heading);
  }

  // RIGHT COLUMN: Paragraph, author info, button
  const rightColContent = [];
  if (rightCol) {
    const paragraph = rightCol.querySelector('.rich-text');
    if (paragraph) rightColContent.push(paragraph);
    const authorGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
    if (authorGrid) {
      const authorRow = authorGrid.children[0];
      if (authorRow) rightColContent.push(authorRow);
      const button = rightCol.querySelector('a.button');
      if (button) rightColContent.push(button);
    }
  }

  // The second grid (below) contains two images
  const imageGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column');
  let image1 = null, image2 = null;
  if (imageGrid) {
    const imgs = imageGrid.querySelectorAll('img');
    image1 = imgs[0] || '';
    image2 = imgs[1] || '';
  }

  // Build the table rows
  const headerRow = ['Columns block (columns11)'];
  const contentRow = [leftColContent, rightColContent];
  const imageRow = [image1, image2];

  const rows = [headerRow, contentRow, imageRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
