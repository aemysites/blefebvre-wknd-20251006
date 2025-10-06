/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the deepest card body
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Get image (mandatory, first cell)
  const img = cardBody.querySelector('img');
  // Get heading (optional, second cell)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose text cell
  const textCell = [];
  if (heading) {
    // Convert to heading element (h2 for carousel)
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell.push(h2);
  }

  // No description or CTA in source, so only heading
  // If more text content existed, it would be added here

  // Table rows
  const headerRow = ['Carousel (carousel24)'];
  const slideRow = [img, textCell.length ? textCell : ''];

  const cells = [headerRow, slideRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
