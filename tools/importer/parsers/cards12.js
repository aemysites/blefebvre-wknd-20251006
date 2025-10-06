/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card links (each card is an <a> tag)
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');

  // Build the table rows
  const rows = [];
  // Header row as per block requirements
  rows.push(['Cards (cards12)']);

  cards.forEach(card => {
    // --- IMAGE CELL ---
    // The image is inside the first div of the card
    const imageContainer = card.querySelector('div.utility-aspect-2x3');
    let img = imageContainer ? imageContainer.querySelector('img') : null;
    // Defensive: if no image, leave cell empty
    const imageCell = img ? img : '';

    // --- TEXT CELL ---
    // Tag and date (optional, can be combined as subtitle)
    const metaRow = card.querySelector('div.flex-horizontal');
    let metaText = '';
    if (metaRow) {
      const tag = metaRow.querySelector('.tag');
      const date = metaRow.querySelector('.paragraph-sm');
      if (tag && date) {
        metaText = `${tag.textContent} | ${date.textContent}`;
      } else if (tag) {
        metaText = tag.textContent;
      } else if (date) {
        metaText = date.textContent;
      }
    }
    // Title (mandatory)
    const title = card.querySelector('h3, h4, h2, h1');
    let titleElem;
    if (title) {
      titleElem = document.createElement('strong');
      titleElem.textContent = title.textContent;
    }
    // Compose text cell: meta (small), title (heading), no description, optional link
    const textCell = document.createElement('div');
    if (metaText) {
      const metaDiv = document.createElement('div');
      metaDiv.style.fontSize = '0.9em';
      metaDiv.style.opacity = '0.7';
      metaDiv.textContent = metaText;
      textCell.appendChild(metaDiv);
    }
    if (titleElem) {
      textCell.appendChild(titleElem);
    }
    rows.push([imageCell, textCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
