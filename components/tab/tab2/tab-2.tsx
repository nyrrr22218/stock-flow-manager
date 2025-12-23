'use client';

import { useTab2 } from '@/hooks/use-tab-2';
import { gridCommon, paperCommon } from '@/styles/commons';
import { Box, Paper, TextField, Typography } from '@mui/material';
import { ButtonCommon } from '../button-common';
import { TItemStock } from '@/types/tab-type/tab-2';

export default function Tab2({ tab2Data }: { tab2Data: TItemStock[] }) {
  const formattedData = tab2Data.map((item) => ({
    ...item,
    stockInInput: item.stock?.stock_count !== undefined ? String(item.stock.stock_count) : '0',
  }));

  const { stockList, setStockList, editMode, handleEditToggle, loading, handleSave } =
    useTab2(formattedData);

  return (
    <Box>
      <Typography variant="h4">在庫管理</Typography>
      <ButtonCommon
        editmode={editMode}
        loading={loading}
        handleEditToggle={handleEditToggle}
        handleSave={handleSave}
      />
      <Box
        sx={{
          ...gridCommon,
        }}
      >
        {stockList.length === 0 && <Typography variant="h5">Loading...</Typography>}
        {stockList.map((st) => (
          <Paper
            key={st.id}
            elevation={1}
            variant="outlined"
            sx={{
              ...paperCommon,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold">
              {st.item_name}
            </Typography>
            <TextField
              type="number"
              value={st.stockInInput ?? ''}
              disabled={!editMode}
              onChange={(e) =>
                setStockList((prev) =>
                  prev.map((i) => (i.id === st.id ? { ...i, stockInInput: e.target.value } : i)),
                )
              }
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
