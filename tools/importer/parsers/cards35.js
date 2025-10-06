/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards35)'];

  // Get all immediate children (each is a card container with an image)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each card, extract image and all text content from alt (if present)
  const rows = cardDivs.map(div => {
    const img = div.querySelector('img');
    let textContent = '';
    if (img && img.hasAttribute('alt')) {
      textContent = img.getAttribute('alt').trim();
    }
    // If alt is missing or empty, fallback to empty string
    return [img, textContent];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
