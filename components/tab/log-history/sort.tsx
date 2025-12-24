import { Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

type SortLogsProps = {
  sortOrder: 'desc' | 'asc';
  setSortOrder: Dispatch<SetStateAction<'desc' | 'asc'>>;
};

export const SortLogs = ({ sortOrder, setSortOrder }: SortLogsProps) => {
  const handleSortChange = (event: SelectChangeEvent<'desc' | 'asc'>) => {
    setSortOrder(event.target.value as 'desc' | 'asc');
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="log-sort-label">並べ替え</InputLabel>
        <Select
          labelId="log-sort-label"
          value={sortOrder ?? ''}
          label="並び替え"
          onChange={handleSortChange}
        >
          <MenuItem value="desc">新しい順</MenuItem>
          <MenuItem value="asc">古い順</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
