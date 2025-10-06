/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Prepare the header row as required
  const headerRow = ['Columns block (columns30)'];

  // Prepare the columns row: each cell is the content of a column (here, each is a div with an image)
  // Reference the existing column divs directly (do not clone)
  const columnsRow = columnDivs.map((colDiv) => colDiv);

  // Build the table structure
  const tableCells = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
