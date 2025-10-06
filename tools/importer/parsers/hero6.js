/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row (row 2)
  // Find the main image (background)
  let bgImg = element.querySelector('img');
  let bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (row 3)
  // Find the card containing the heading, subheading, and CTAs
  let contentCell = '';
  const card = element.querySelector('.card');
  if (card) {
    // We'll collect the heading, subheading, and button group
    const contentParts = [];
    // Heading (h1)
    const h1 = card.querySelector('h1');
    if (h1) contentParts.push(h1);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) contentParts.push(subheading);
    // Buttons (button group)
    const btnGroup = card.querySelector('.button-group');
    if (btnGroup) {
      // Only include links (a) as CTAs
      const ctas = Array.from(btnGroup.querySelectorAll('a'));
      if (ctas.length > 0) {
        // Wrap in a div for layout preservation
        const ctaDiv = document.createElement('div');
        ctaDiv.append(...ctas);
        contentParts.push(ctaDiv);
      }
    }
    contentCell = contentParts;
  }
  const contentRow = [contentCell];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgImgRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
