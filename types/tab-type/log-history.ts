import { Dispatch, SetStateAction } from 'react';

export type SortLogsProps = {
  descAscLog: 'desc' | 'asc';
  setDescAscLog: Dispatch<SetStateAction<'desc' | 'asc'>>;
  sortLogMenu: string;
  setSortLogMenu: Dispatch<SetStateAction<string>>;
  sortLogMonth: string;
  setSortLogMonth: Dispatch<SetStateAction<string>>;
};

export type SortCalendar = Pick<SortLogsProps, 'sortLogMonth' | 'setSortLogMonth'>;
