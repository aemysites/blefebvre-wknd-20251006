/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns (image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  const imageEl = columns.find(el => el.tagName === 'IMG');
  // Second column: content (the non-image div)
  const contentEl = columns.find(el => el.tagName !== 'IMG');

  if (!imageEl || !contentEl) return;

  // Table header row: must match block name exactly
  const headerRow = ['Columns block (columns33)'];

  // Table content row: image element, then content element
  const row = [imageEl, contentEl];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
