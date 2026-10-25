/* Campus Lost & Found Portal - simple keyword-based match notification stub */

function findPotentialMatches(lostItem, allItems) {
  return allItems.filter(it =>
    it.type === 'Found' &&
    it.category === lostItem.category &&
    it.status === 'Active' &&
    it.id !== lostItem.id
  );
}

function notifyIfMatchFound(lostItem) {
  const items = Store.getItems();
  const matches = findPotentialMatches(lostItem, items);
  if (matches.length > 0) {
    console.log(
      `Notification: ${matches.length} possible match(es) found for "${lostItem.title}". ` +
      `Check the Search page to review found items in the "${lostItem.category}" category.`
    );
  }
  return matches;
}
