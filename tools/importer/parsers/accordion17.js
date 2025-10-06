/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required: exactly one column
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Get all immediate children that are accordions
  const accordionItems = Array.from(element.querySelectorAll(':scope > .accordion'));

  accordionItems.forEach((item) => {
    // Title cell: Find the toggle div with the actual visible title
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleEl = null;
    if (toggle) {
      // The title is typically in a div with class 'paragraph-lg'
      titleEl = toggle.querySelector('.paragraph-lg');
      if (!titleEl) titleEl = toggle;
    }

    // Content cell: Find the dropdown content
    let contentEl = null;
    const nav = item.querySelector('.accordion-content');
    if (nav) {
      contentEl = nav.querySelector('.rich-text');
      if (!contentEl) contentEl = nav;
    }

    // Only add row if both cells are present
    if (titleEl && contentEl) {
      rows.push([titleEl, contentEl]);
    }
  });

  // Create and replace with block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
