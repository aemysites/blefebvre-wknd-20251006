/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (contains columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get columns: should be two children (content and image)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Identify which is image and which is content
  let imgCol, contentCol;
  if (columns[0].tagName === 'IMG') {
    imgCol = columns[0];
    contentCol = columns[1];
  } else if (columns[1].tagName === 'IMG') {
    imgCol = columns[1];
    contentCol = columns[0];
  } else {
    // fallback: no image found
    imgCol = '';
    contentCol = columns[0];
  }

  // For contentCol: include all text content (h1, p, buttons)
  const contentFragment = document.createDocumentFragment();
  Array.from(contentCol.childNodes).forEach((node) => {
    contentFragment.appendChild(node.cloneNode(true));
  });

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns3)'];
  const columnsRow = [contentFragment, imgCol];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace element with table
  element.replaceWith(table);
}
