import { LOCAL_STORAGE_NAME } from '../constants';
import { getLocalStorageItem } from 'utils';
import { append } from 'ramda';

function create(data: UserData) {
  const users = getLocalStorageItem<Users>(LOCAL_STORAGE_NAME);
  const lastItem = Array.isArray(users) ? users.slice(-1).pop() : { id: 0 };
  const nextId = lastItem && lastItem.id + 1 || 1;
  const newState = append({ id: nextId, ...data }, users || []);

  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newState));

  return Promise.resolve(newState);
}

export default create;