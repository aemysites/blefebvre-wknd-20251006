/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Table header row: always use block name
  const headerRow = ['Hero (hero29)'];

  // --- Extract background image (row 2) ---
  // The image is inside: header > div.grid-layout > div (with .ix-parallax-scale-out-hero) > img
  let bgImg = null;
  const gridLayout = element.querySelector('.grid-layout');
  if (gridLayout) {
    // Find all immediate children of gridLayout
    const gridChildren = gridLayout.querySelectorAll(':scope > div');
    for (const child of gridChildren) {
      // Look for a descendant img element
      const img = child.querySelector('img');
      if (img) {
        bgImg = img;
        break;
      }
    }
  }
  const imageRow = [bgImg ? bgImg : ''];

  // --- Extract text content (row 3) ---
  // The heading is inside: header > div.grid-layout > div.container > div > h1
  let textContent = [];
  let h1 = null;
  if (gridLayout) {
    const container = gridLayout.querySelector('.container');
    if (container) {
      // Get all children of container
      const innerDiv = container.querySelector(':scope > div');
      if (innerDiv) {
        h1 = innerDiv.querySelector('h1');
        if (h1) {
          textContent.push(h1);
        }
        // Optionally, add button-group or CTA if present
        const buttonGroup = innerDiv.querySelector('.button-group');
        if (buttonGroup && buttonGroup.children.length > 0) {
          textContent.push(buttonGroup);
        }
      }
    }
  }
  const textRow = [textContent.length ? textContent : ''];

  // --- Compose table ---
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
