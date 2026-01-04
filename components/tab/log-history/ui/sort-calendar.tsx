'use client';

import type { SortCalendar as SortCalendarType } from '@/types';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const SortCalendar = ({ sortLogMonth, setSortLogMonth }: SortCalendarType) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ja">
      <DatePicker
        label="年月を選択"
        views={['year', 'month']}
        format="YYYY年 M月"
        value={sortLogMonth ? dayjs(sortLogMonth) : null}
        onChange={(newValue) => {
          setSortLogMonth(newValue ? newValue.format('YYYY-MM') : '');
        }}
        slotProps={{
          textField: {
            size: 'medium',
            sx: { width: 200 },
          },
          desktopPaper: {
            sx: { transform: 'scale(1.2)', transformOrigin: 'top left' },
          },
        }}
      />
    </LocalizationProvider>
  );
};
