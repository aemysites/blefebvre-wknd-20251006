/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block header with exactly one column
  const table = document.createElement('table');
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = 'Cards (cards7)';
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  // Each card is a div with an image inside
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    const tr = document.createElement('tr');
    // First cell: image
    const tdImg = document.createElement('td');
    if (img) {
      tdImg.appendChild(img.cloneNode(true));
    }
    tr.appendChild(tdImg);
    // Second cell: all text content (alt text or fallback)
    const tdText = document.createElement('td');
    let textContent = '';
    // Extract all text nodes except those inside <img> or its attributes
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();
    // If no text nodes, fallback to img alt
    if (!textContent && img && img.alt) {
      textContent = img.alt;
    }
    tdText.textContent = textContent;
    tr.appendChild(tdText);
    table.appendChild(tr);
  });

  element.replaceWith(table);
}
