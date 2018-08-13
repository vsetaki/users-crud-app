import { LOCAL_STORAGE_NAME } from '../constants';
import { getLocalStorageItem } from 'utils';
import { remove } from 'ramda';

function deleteUser(id: number) {
  const users = getLocalStorageItem<Users>(LOCAL_STORAGE_NAME);
  let newState: Users = [];

  if (users && Array.isArray(users)) {
    const userIndex = users.findIndex((item) => item.id === id);
    newState = remove(userIndex, 1, users);
  }

  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(newState));
}

export default deleteUser;