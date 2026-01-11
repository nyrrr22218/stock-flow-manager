import { Dispatch, SetStateAction } from 'react';

export type SortLogsProps = {
  descAscLog: 'desc' | 'asc';
  setDescAscLog: Dispatch<SetStateAction<'desc' | 'asc'>>;
  sortLogMenu: string;
  setSortLogMenu: Dispatch<SetStateAction<string>>;
};

export type SortCalendar = {
  sortLogMonth: string;
  setSortLogMonth: Dispatch<SetStateAction<string>>;
};
