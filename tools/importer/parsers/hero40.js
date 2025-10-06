/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero40)'];

  // 2. Background image row
  // Find the background image (img.cover-image)
  let bgImg = element.querySelector('img.cover-image');
  let bgImgCell = '';
  if (bgImg) {
    bgImgCell = bgImg;
  }

  // 3. Content row (Heading, subheading, CTA)
  // Find the container with the text and CTA
  let contentCell = '';
  // The text content is inside the second .container
  const contentContainer = element.querySelector('.container');
  if (contentContainer) {
    // The grid inside the container holds the heading and the rest
    const grid = contentContainer.querySelector('.w-layout-grid');
    if (grid) {
      // The first child is the h1
      const heading = grid.querySelector('h1');
      // The second child is a div.flex-vertical, which contains the paragraph and button
      const flexVertical = grid.querySelector('.flex-vertical');
      let contentParts = [];
      if (heading) contentParts.push(heading);
      if (flexVertical) {
        // flexVertical contains the paragraph and button group
        // We'll include the whole flexVertical for resilience
        contentParts.push(flexVertical);
      }
      if (contentParts.length) {
        contentCell = contentParts;
      }
    }
  }

  // Build the table
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
