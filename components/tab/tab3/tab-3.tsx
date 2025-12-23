'use client';

import { useTab3 } from '@/hooks/use-tab-3';
import { gridCommon, paperCommon } from '@/styles/commons';
import { Box, Paper, TextField, Typography } from '@mui/material';
import { ButtonCommon } from '../button-common';
import { TItemProduct } from '@/types/tab-type/tab-3';

export default function Tab3({ tab3Data }: { tab3Data: TItemProduct[] }) {
  const formattedData = tab3Data.map((item) => ({
    ...item,
    productedInInput:
      item.product?.producted_count !== undefined ? String(item.product.producted_count) : '0',
  }));
  const { product, setProduct, editMode, setEditMode, loading, handleSave } =
    useTab3(formattedData);
  const handleEditToggle = () => setEditMode((prev: boolean) => !prev);

  return (
    <Box>
      <Typography variant="h4">生産数管理</Typography>
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
        {product.length === 0 && <Typography variant="h5">Loading...</Typography>}
        {product.map((pr) => (
          <Paper key={pr.id} elevation={1} variant="outlined" sx={{ ...paperCommon }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {pr.item_name}
            </Typography>
            <TextField
              type="number"
              value={pr.productedInInput}
              disabled={!editMode}
              onChange={(e) =>
                setProduct((prev) =>
                  prev.map((i) =>
                    i.id === pr.id ? { ...i, productedInInput: e.target.value } : i,
                  ),
                )
              }
            />
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
