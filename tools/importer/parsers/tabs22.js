/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];

  // 2. Get tab labels (from tab menu)
  // The first child is the tab menu, second is tab content
  const children = getDirectChildren(element, 'div');
  if (children.length < 2) return;
  const tabMenu = children[0];
  const tabContent = children[1];

  // Tab labels: get all <a> direct children of tabMenu
  const tabLinks = getDirectChildren(tabMenu, 'a');
  // Tab panes: get all direct children of tabContent (each is a tab pane)
  const tabPanes = getDirectChildren(tabContent, 'div');

  // Defensive: Only pair up to the minimum count
  const tabCount = Math.min(tabLinks.length, tabPanes.length);

  // Build rows: Each row is [label, content]
  const rows = [];
  for (let i = 0; i < tabCount; i++) {
    // Tab label: get the inner text of the label div inside the <a>
    const labelDiv = tabLinks[i].querySelector('div');
    let label = labelDiv ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();
    // Tab content: use the grid-layout div inside the tab pane
    const gridDiv = tabPanes[i].querySelector('.grid-layout');
    let content = gridDiv || tabPanes[i]; // fallback to tabPane if grid missing
    rows.push([label, content]);
  }

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
