/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Carousel (carousel16)'];
  const rows = [headerRow];

  // Find the grid container with the images
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) {
    element.replaceWith(document.createTextNode(''));
    return;
  }

  // Each grid > div contains one image (nested inside another div)
  const slideDivs = Array.from(grid.querySelectorAll(':scope > div'));

  slideDivs.forEach((slideDiv) => {
    const img = slideDiv.querySelector('img');
    if (img) {
      // Each row must have 2 columns: [image, empty text cell]
      rows.push([img, '']);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
