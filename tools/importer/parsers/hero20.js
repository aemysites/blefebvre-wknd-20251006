/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all immediate child divs of a parent
  function getImmediateDivs(parent) {
    return Array.from(parent.querySelectorAll(':scope > div'));
  }

  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Find background images (all <img> in the hero grid)
  let backgroundImages = [];
  // Find the grid containing images
  const gridLayout = element.querySelector('.desktop-3-column');
  if (gridLayout) {
    // Get all immediate child divs of gridLayout
    const gridDivs = getImmediateDivs(gridLayout);
    gridDivs.forEach(div => {
      const img = div.querySelector('img');
      if (img) backgroundImages.push(img);
    });
  }

  // Defensive: If no images found, leave cell empty
  const backgroundRow = [backgroundImages.length > 0 ? backgroundImages : ''];

  // 3. Find text content (title, subheading, CTA)
  let textContent = [];
  // Find the content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  if (contentContainer) {
    // Use the whole container for resilience
    textContent = [contentContainer];
  } else {
    textContent = [''];
  }

  // 4. Build table rows
  const rows = [
    headerRow,
    backgroundRow,
    textContent
  ];

  // 5. Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
