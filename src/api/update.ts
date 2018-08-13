import { LOCAL_STORAGE_NAME } from '../constants';
import { getLocalStorageItem, setLocalStorageItem } from 'utils';
import { update as updateArray } from 'ramda';

function update(id: number, data: UserData) {
  const users = getLocalStorageItem<Users>(LOCAL_STORAGE_NAME);
  let newState: Users = [];

  if (users && Array.isArray(users)) {
    const userIndex = users.findIndex((item) => item.id === id);
    users[userIndex] = { id, ...data };
    newState = updateArray(userIndex, { id, ...data }, users);
  }

  setLocalStorageItem<Users>(LOCAL_STORAGE_NAME, newState);

  return Promise.resolve(newState);
}

export default update;