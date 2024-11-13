export function validateWardrobe(items) {
  if (!Array.isArray(items)) return false;
  
  return items.every(item => (
    item.id &&
    item.type &&
    item.image &&
    item.color &&
    Array.isArray(item.season) &&
    Array.isArray(item.occasions)
  ));
}