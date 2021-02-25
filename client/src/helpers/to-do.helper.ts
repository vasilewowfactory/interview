/* eslint-disable */
import { ToDo } from '@/interfaces';

export const addDiffDateToItems = (items: ToDo[]) => items.map((item: ToDo) => calculateDiffDate(item));
export const calculateDiffDate = (item: ToDo) => {
  const createdAt = new Date(item.createdAt);
  const updatedAt = new Date(item.updatedAt);
  const time: number = (updatedAt.getTime() - createdAt.getTime());

  item.diffDate = Math.round(time / 60000);
  return item;
};

