/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by selector
  const getDirectChildren = (el, selector) => Array.from(el.querySelectorAll(`:scope > ${selector}`));

  // Header row as required
  const headerRow = ['Hero (hero37)'];

  // Row 2: Background image (optional)
  // This source HTML does NOT have a background image element, so leave cell empty
  const bgImageRow = [''];

  // Row 3: Content (headline, subheading, CTA)
  // Find the grid-layout div (contains all hero content)
  const grid = element.querySelector('.grid-layout');
  let contentCell = [];
  if (grid) {
    // The first child div contains heading and subheading
    const contentDiv = grid.querySelector('div');
    if (contentDiv) {
      // Collect heading and subheading
      const heading = contentDiv.querySelector('h2');
      if (heading) contentCell.push(heading);
      const subheading = contentDiv.querySelector('p');
      if (subheading) contentCell.push(subheading);
    }
    // The CTA is an <a> button, sibling to the contentDiv
    const cta = grid.querySelector('a.button');
    if (cta) contentCell.push(cta);
  }
  // Defensive: If nothing found, fallback to all content
  if (contentCell.length === 0) {
    contentCell = [element];
  }

  // Compose table rows
  const rows = [
    headerRow,
    bgImageRow,
    [contentCell],
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
