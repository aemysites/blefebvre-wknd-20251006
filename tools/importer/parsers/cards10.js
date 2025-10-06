/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Defensive: get all immediate card links (each card is an <a>)
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach((card) => {
    // Get image (first child div contains img)
    const imageContainer = card.querySelector(':scope > div.utility-aspect-3x2');
    let image = null;
    if (imageContainer) {
      image = imageContainer.querySelector('img');
    }

    // Get text content container
    const textContainer = card.querySelector(':scope > div.utility-padding-all-1rem');
    const textParts = [];

    if (textContainer) {
      // Tag (optional, styled as a badge)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) {
        // Use the whole tag group (could be styled)
        textParts.push(tagGroup);
      }
      // Heading (h3)
      const heading = textContainer.querySelector('h3');
      if (heading) {
        textParts.push(heading);
      }
      // Description (p)
      const description = textContainer.querySelector('p');
      if (description) {
        textParts.push(description);
      }
    }

    // Compose row: [image, text]
    // Defensive: always use array for cell content
    const row = [image ? image : '', textParts.length ? textParts : ''];
    rows.push(row);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
