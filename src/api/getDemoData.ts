const url = 'data.json';

/**
 * Возвращает демо данные
 */
function getDemoData(): Promise<Users> {
  return fetch(url)
    .then(response => response.json());
}

export default getDemoData;