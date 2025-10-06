/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and all text from a card anchor
  function extractCardContent(card) {
    // Find image (mandatory)
    let img = card.querySelector('img');
    // Compose text cell: include all heading and paragraph-sm elements in order
    const textParts = [];
    // Get all elements that are either h3 or .paragraph-sm inside the card (in order)
    card.querySelectorAll('h3, .paragraph-sm').forEach(el => {
      textParts.push(el);
    });
    // Defensive: if no heading/desc, try to get all text content from card
    if (textParts.length === 0) {
      // fallback: get all text nodes
      const text = card.textContent.trim();
      if (text) textParts.push(document.createTextNode(text));
    }
    return [img, textParts];
  }

  // Find all tab panes (each tab is a set of cards)
  const tabPanes = element.querySelectorAll(':scope > div');
  // Collect all cards from all tabs
  const cards = [];
  tabPanes.forEach(tabPane => {
    // Find grid layout inside tab
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Find all direct card anchors in grid
    const cardLinks = grid.querySelectorAll(':scope > a');
    cardLinks.forEach(card => {
      // Defensive: skip if no image or text
      const [img, textParts] = extractCardContent(card);
      if (!img && textParts.length === 0) return;
      cards.push([img, textParts]);
    });
  });

  // Build table rows
  const headerRow = ['Cards (cards23)'];
  const tableRows = [headerRow];
  cards.forEach(([img, textParts]) => {
    // Only add rows with image and text
    if (img && textParts.length) {
      tableRows.push([img, textParts]);
    }
  });

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
