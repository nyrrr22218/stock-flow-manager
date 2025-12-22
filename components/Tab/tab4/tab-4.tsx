'use client';

import { Tab4Form } from '@/components/tab/tab4/tab-4-paper';
import { useTab4 } from '@/hooks/use-tab-4';
import { gridCommon, paperCommon } from '@/styles/commons';
import { Box, Button, Paper, Typography } from '@mui/material';

export default function Tab4() {
  const {
    addNewItemName,
    setAddNewItemName,
    error,
    itemnameList,
    loading,
    handleItemAdd,
    deleteItemnameTable,
  } = useTab4();

  return (
    <Box>
      <Tab4Form
        handleItemAdd={handleItemAdd}
        addNewItemName={addNewItemName}
        setAddNewItemName={setAddNewItemName}
        error={error}
        loading={loading}
      />
      <Box sx={{ ml: 2 }}>
        {itemnameList.length === 0 && (
          <Typography variant="h5" color="text.secondary" sx={{ mt: 4 }}>
            Loading...
          </Typography>
        )}
        <Box
          sx={{
            ...gridCommon,
          }}
        >
          {itemnameList.map((item) => (
            <Paper
              key={item.id}
              elevation={1}
              sx={{
                ...paperCommon,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {item.item_name}
              </Typography>
              <Button
                onClick={() => deleteItemnameTable(item.id)}
                variant="outlined"
                color="error"
                size="small"
                sx={{ mt: 'auto' }}
              >
                削除
              </Button>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
