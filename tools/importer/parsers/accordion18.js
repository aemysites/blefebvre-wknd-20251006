/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Defensive: get all immediate children with class 'divider' (each is an accordion item)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .divider'));

  accordionItems.forEach((item) => {
    // Each divider contains a grid-layout with two children: title and content
    const grid = item.querySelector('.grid-layout');
    if (!grid) return; // Defensive: skip if structure is unexpected
    const children = Array.from(grid.children);
    if (children.length < 2) return; // Defensive: skip if not enough children

    // Title cell: usually h4-heading
    const title = children[0];
    // Content cell: usually rich-text paragraph
    const content = children[1];

    rows.push([title, content]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(table);
}
