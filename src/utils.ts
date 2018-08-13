
import { range } from 'ramda';
/**
 * Возвращает объект из localStorage
 */
export function getLocalStorageItem<T>(name: string): T | null {
  const item = localStorage.getItem(name);

  return item ? JSON.parse(item) : null;
}

export function setLocalStorageItem<T>(name: string, value: T): void {
  localStorage.setItem(name, JSON.stringify(value));
}

export function isLeapYear(year: number) {
  return new Date(year, 1, 29).getDate() === 29;
}

export function getMonthDays(month: number, year: number): number[] {
  let daysCount = 31;

  if (month === 2) {
    daysCount = isLeapYear(year) ? 29 : 28;
  } else if (!((month + 1) % 2)) {
    daysCount = 30;
  }

  return range(1, daysCount + 1);
}