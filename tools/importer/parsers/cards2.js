/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text from a card anchor
  function extractCardRow(cardAnchor) {
    // Find image (mandatory, always in a div with img inside)
    const imgDiv = cardAnchor.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let img = imgDiv ? imgDiv.querySelector('img') : null;
    // Defensive: if no image found, try to find any img
    if (!img) img = cardAnchor.querySelector('img');

    // Find text content
    const contentDiv = cardAnchor.querySelector('.utility-padding-all-2rem');
    let heading, description, cta;
    if (contentDiv) {
      heading = contentDiv.querySelector('h3');
      description = contentDiv.querySelector('p');
      cta = contentDiv.querySelector('.button');
    } else {
      heading = cardAnchor.querySelector('h3, .h4-heading');
      description = cardAnchor.querySelector('p');
      cta = null; // In right column, no CTA
    }

    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (description) textCell.push(description);
    if (cta) textCell.push(cta);

    return [img, textCell];
  }

  // Get all top-level cards (left column: 1, right column: 4)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let cardRows = [];
  if (grid) {
    // The first child is the left column card (anchor)
    const leftCardAnchor = grid.querySelector('a.utility-link-content-block');
    if (leftCardAnchor) {
      cardRows.push(extractCardRow(leftCardAnchor));
    }
    // The second child is the right column grid
    const rightGrid = grid.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
    if (rightGrid) {
      const rightCards = rightGrid.querySelectorAll('a.utility-link-content-block');
      rightCards.forEach(cardAnchor => {
        cardRows.push(extractCardRow(cardAnchor));
      });
    }
  }

  // Defensive: fallback if structure changes
  if (cardRows.length === 0) {
    // Try to find all card anchors in element
    const allCards = element.querySelectorAll('a.utility-link-content-block');
    allCards.forEach(cardAnchor => {
      cardRows.push(extractCardRow(cardAnchor));
    });
  }

  // Build table array
  const headerRow = ['Cards (cards2)'];
  const tableRows = cardRows.map(row => [row[0], row[1]]);
  const cells = [headerRow, ...tableRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
