/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Get all direct child <a> elements (each is a card)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((cardLink) => {
    // Find the image (mandatory)
    const img = cardLink.querySelector('img');
    // Find the card content container (the div after the image)
    const contentDiv = cardLink.querySelector('div:not(.w-layout-grid)');
    // Defensive: fallback if not found
    const cardContent = contentDiv || cardLink;

    // Compose the text cell by including ALL content blocks after the image
    // This ensures all text is included, not just heading/desc/cta
    const textCellContent = [];
    // Select all elements after the image inside cardContent
    let foundImg = false;
    Array.from(cardContent.children).forEach((child) => {
      if (!foundImg && child.tagName === 'IMG') {
        foundImg = true;
        return;
      }
      if (foundImg) {
        textCellContent.push(child);
      }
    });
    // If nothing found, fallback to all children except img
    if (textCellContent.length === 0) {
      Array.from(cardContent.children).forEach((child) => {
        if (child.tagName !== 'IMG') textCellContent.push(child);
      });
    }

    rows.push([
      img,
      textCellContent
    ]);
  });

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(blockTable);
}
