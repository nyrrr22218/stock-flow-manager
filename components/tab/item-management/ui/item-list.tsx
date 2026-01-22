'use client';

import { paperCommon } from '@/styles/commons';

import type { ItemList as ItemListType } from '@/types';

import { Paper, Typography, Button } from '@mui/material';

export const ItemList = ({ itemNameData, openDialog }: ItemListType) => {
  return (
    <>
      {itemNameData.map((item) => (
        <Paper
          key={item.id}
          elevation={1}
          sx={{
            ...paperCommon,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            {item.ItemName}
          </Typography>
          <Button
            onClick={() => openDialog(item)}
            variant="outlined"
            color="error"
            size="small"
            sx={{ mt: 'auto' }}
          >
            削除
          </Button>
        </Paper>
      ))}
    </>
  );
};
