/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all immediate card divs
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the icon image
    const iconDiv = cardDiv.querySelector(':scope > div > .icon');
    let iconImg = null;
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Find all text content (not just <p>)
    // Grab the text container div (the direct child after icon)
    let textContainer = null;
    const children = Array.from(cardDiv.children);
    // Find the child that is not the icon container
    for (const child of children) {
      if (!child.querySelector('.icon')) {
        textContainer = child;
        break;
      }
    }
    // If not found, fallback to the second child
    if (!textContainer && children.length > 1) {
      textContainer = children[1];
    }
    // Defensive: If still not found, fallback to cardDiv
    if (!textContainer) {
      textContainer = cardDiv;
    }

    // Compose the row: icon in first cell, full text block in second
    const row = [iconImg, textContainer];
    rows.push(row);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
