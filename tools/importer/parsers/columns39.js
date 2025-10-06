/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container
  if (!element || !element.children || element.children.length === 0) return;

  // Header row as specified
  const headerRow = ['Columns block (columns39)'];

  // Get all immediate child divs (each column)
  const columnDivs = element.querySelectorAll(':scope > div');

  // For this block, each child div is a column cell
  // Each div contains an image (per the source HTML and screenshot)
  const columns = Array.from(columnDivs).map((colDiv) => {
    // Defensive: find the first image inside the column div
    const img = colDiv.querySelector('img');
    // Only include the image if it exists
    return img ? img : document.createTextNode('');
  });

  // Build the table rows
  const rows = [
    headerRow,     // First row: block name
    columns        // Second row: images side by side
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
