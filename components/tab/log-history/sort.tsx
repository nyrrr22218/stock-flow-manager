'use client';

import { sortMenu } from '../contents/objects';

import type { SortLogsProps } from '@/types';

import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

export const SortLogs = ({
  descAscLog,
  setDescAscLog,
  sortLogMenu,
  setSortLogMenu,
}: SortLogsProps) => {
  const descAscLogChange = (e: SelectChangeEvent<'desc' | 'asc'>) => {
    setDescAscLog(e.target.value);
  };

  const handleSortChange = (e: SelectChangeEvent<string>) => {
    setSortLogMenu(e.target.value);
  };

  return (
    <>
      <FormControl sx={{ width: 150 }}>
        <InputLabel id="log-sort-label" shrink>
          絞り込み
        </InputLabel>
        <Select
          labelId="log-sort-label"
          value={sortLogMenu ?? ''}
          label="絞り込み"
          onChange={handleSortChange}
          displayEmpty
          MenuProps={{
            disableScrollLock: true,
          }}
        >
          {sortMenu.map((menu, index) => (
            <MenuItem key={index} value={menu === '[すべて]' ? '' : menu}>
              {menu}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ width: 150 }}>
        <InputLabel id="log-sort-label" shrink>
          並べ替え
        </InputLabel>
        <Select
          labelId="log-sort-label"
          value={descAscLog ?? ''}
          label="並び替え"
          onChange={descAscLogChange}
          MenuProps={{
            disableScrollLock: true,
          }}
        >
          <MenuItem value="desc">新しい順</MenuItem>
          <MenuItem value="asc">古い順</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
