const LOCAL_STORAGE_NAME: string = 'users';

const REQUIRED_RULE = { required: true, message: 'Поле обязательно для заполнения' };

const DATE_FORMAT_DISPLAY = 'DD.MM.YYYY';
const DATE_FORMAT_STORAGE = 'YYYY.MM.DD';

export {
  LOCAL_STORAGE_NAME, REQUIRED_RULE,
  DATE_FORMAT_DISPLAY, DATE_FORMAT_STORAGE,
};