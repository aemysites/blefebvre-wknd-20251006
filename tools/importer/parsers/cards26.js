/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from a card container
  function extractCard(cardDiv) {
    // Find the first image inside the card
    const img = cardDiv.querySelector('img');
    // Find the heading and description, if present
    let heading = null;
    let description = null;
    // Look for a heading (h3 or h2)
    heading = cardDiv.querySelector('h3, h2');
    // Look for a paragraph
    description = cardDiv.querySelector('p');
    // Compose the text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (description) textCell.appendChild(description);
    return [img, textCell];
  }

  // Get all immediate children of the grid
  const cardContainers = Array.from(element.querySelectorAll(':scope > div'));
  const rows = [];
  for (const cardDiv of cardContainers) {
    // Only process cards that have an image
    const img = cardDiv.querySelector('img');
    if (!img) continue;
    // If the card has text content (h3/h2/p), use it; otherwise, leave text cell empty
    const hasText = cardDiv.querySelector('h3, h2, p');
    if (hasText) {
      rows.push(extractCard(cardDiv));
    } else {
      // If no text, just image and empty cell
      rows.push([img, '']);
    }
  }
  // Table header
  const headerRow = ['Cards (cards26)'];
  const tableCells = [headerRow, ...rows];
  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  // Replace the original element
  element.replaceWith(table);
}
