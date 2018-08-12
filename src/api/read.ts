import { LOCAL_STORAGE_NAME } from '../constants';
import { getLocalStorageItem } from 'utils';

/**
 * Загружает пользователей из хранилища (localStorage)
 */
function read(): Promise<Users> {
  const users = getLocalStorageItem<Users>(LOCAL_STORAGE_NAME);
  return new Promise((resolve, reject) => {
    if (users) {
      resolve(users);
    } else {
      reject('Не удалось получить пользователей');
    }
  });
}

export default read;