/**
 * Возвращает объект из localStorage
 */
export function getLocalStorageItem<T>(name: string): T | null {
  const item = localStorage.getItem(name);

  return item ? JSON.parse(item) : null;
}