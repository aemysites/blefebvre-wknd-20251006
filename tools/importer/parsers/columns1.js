/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the target block name as the header row
  const headerRow = ['Columns block (columns1)'];

  // Get all immediate children (the column divs)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only include columns that have at least one child (should be the image)
  const columnCells = columns.map(col => {
    // If the column contains an image, use the image element directly
    const img = col.querySelector('img');
    if (img) return img;
    // Otherwise, include the column as is (fallback)
    return col;
  });

  // Build the table rows
  const rows = [
    headerRow,
    columnCells,
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
