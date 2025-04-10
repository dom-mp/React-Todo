export interface TodoItem {
  completed: boolean,
  day: string,
  description: string,
  month: string,
  title: string,
  year: string,
  id?: number,
}

export type DateProp = 'day' | 'month' | 'year';