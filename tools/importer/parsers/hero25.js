/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of the grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // 1. HEADER ROW
  const headerRow = ['Hero (hero25)'];

  // 2. BACKGROUND IMAGE/VIDEO ROW
  // Find the YouTube embed wrapper
  let bgAsset = null;
  const videoWrap = gridChildren.find(el => el.querySelector('iframe'));
  if (videoWrap) {
    // Use the <img> as the background asset if present
    const img = videoWrap.querySelector('img');
    if (img) {
      bgAsset = img;
    } else {
      // Fallback: if no image, use the iframe as a link
      const iframe = videoWrap.querySelector('iframe');
      if (iframe && iframe.src) {
        const a = document.createElement('a');
        a.href = iframe.src;
        a.textContent = iframe.src;
        bgAsset = a;
      }
    }
  }
  const bgRow = [bgAsset ? bgAsset : ''];

  // 3. CONTENT ROW
  // Title: visually, the big heading is the div.h1-heading
  const titleDiv = gridChildren.find(el => el.classList.contains('h1-heading'));
  // Subheading: the <p class="subheading">
  const subheadingDiv = gridChildren.find(el => el.querySelector('p.subheading'));
  // CTA: the .button-group
  const ctaDiv = gridChildren.find(el => el.classList.contains('button-group'));

  // Compose content cell
  const contentCell = [];
  if (titleDiv) contentCell.push(titleDiv);
  if (subheadingDiv) {
    const sub = subheadingDiv.querySelector('p.subheading');
    if (sub) contentCell.push(sub);
  }
  if (ctaDiv) contentCell.push(ctaDiv);

  const contentRow = [contentCell];

  // Assemble table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
