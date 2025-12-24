'use client';

import { useProducedCount } from '@/hooks/use-produced-count';
import { gridCommon, paperCommon } from '@/styles/commons';
import { Box, Paper, TextField, Typography } from '@mui/material';
import { ProductedCount } from '@/types';
import { ButtonCommon, ErrorMessage } from '@/components';

export default function ProducedCount({ productData }: { productData: ProductedCount[] }) {
  const productDataWithInput = productData.map((item) => ({
    ...item,
    productedInInput:
      item.product?.producted_count !== undefined ? String(item.product.producted_count) : '0',
  }));
  const {
    producedCountList,
    setProducedCountList,
    editMode,
    setEditMode,
    loading,
    handleSave,
    errorMessage,
    setErrorMessage,
  } = useProducedCount(productDataWithInput);

  return (
    <Box>
      <Typography variant="h4">生産数管理</Typography>
      <ErrorMessage errorMessage={errorMessage} clearError={() => setErrorMessage(null)} />
      <ButtonCommon
        editmode={editMode}
        loading={loading}
        setEditMode={setEditMode}
        handleSave={handleSave}
      />
      <Box
        sx={{
          ...gridCommon,
        }}
      >
        {producedCountList.length === 0 && <Typography variant="h5">Loading...</Typography>}
        {producedCountList.map((pr) => (
          <Paper key={pr.id} elevation={1} variant="outlined" sx={{ ...paperCommon }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {pr.item_name}
            </Typography>
            <TextField
              type="number"
              value={pr.productedInInput}
              disabled={!editMode}
              onChange={(e) =>
                setProducedCountList((prev) =>
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
