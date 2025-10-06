/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main grid children: image and content
  const gridDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Row 2: Background image
  let bgImg = '';
  if (gridDivs.length > 0) {
    const bgDiv = gridDivs[0];
    const img = bgDiv.querySelector('img');
    if (img) {
      bgImg = img;
    }
  }

  // Row 3: Content (headline, subheading, CTA)
  let contentCell = '';
  if (gridDivs.length > 1) {
    const contentDiv = gridDivs[1];
    const cardBody = contentDiv.querySelector('.card-body');
    if (cardBody) {
      const frag = document.createDocumentFragment();
      // Headline
      const h2 = cardBody.querySelector('h2');
      if (h2) frag.appendChild(h2.cloneNode(true));
      // All vertical flex sections (subheadings, paragraphs, etc)
      const flexVertical = cardBody.querySelector('.flex-vertical');
      if (flexVertical) {
        flexVertical.querySelectorAll('.flex-horizontal').forEach(flex => {
          const icon = flex.querySelector('.icon-small img');
          const para = flex.querySelector('p');
          const row = document.createElement('div');
          row.style.display = 'flex';
          if (icon) {
            row.appendChild(icon.cloneNode(true));
          }
          if (para) {
            row.appendChild(para.cloneNode(true));
          }
          frag.appendChild(row);
        });
      }
      // Button group (CTA)
      const buttonGroup = cardBody.querySelector('.button-group');
      if (buttonGroup) {
        buttonGroup.querySelectorAll('a,button').forEach(btn => {
          frag.appendChild(btn.cloneNode(true));
        });
      }
      if (frag.childNodes.length > 0) {
        contentCell = frag;
      } else {
        contentCell = null;
      }
    } else {
      contentCell = null;
    }
  } else {
    contentCell = null;
  }

  // Compose table: always 3 rows (header, image, content), but omit the content row if empty
  const headerRow = ['Hero (hero13)'];
  const imageRow = [bgImg ? bgImg : ''];
  const cells = [headerRow, imageRow];
  if (contentCell) {
    cells.push([contentCell]);
  }
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(table);
}
