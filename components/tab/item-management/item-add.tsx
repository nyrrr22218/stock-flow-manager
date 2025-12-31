'use client';

import { useItemManagement } from '@/hooks/use-item-management';
import { gridCommon } from '@/styles/commons';
import { Box, Typography } from '@mui/material';
import type { ItemName } from '@/schemas';
import { ItemDeleteDialog } from './ui/delete-dialog';
import { AddItemForm } from './ui/item-add-form';
import { ItemList } from './ui/item-list';

export default function ItemManagement({ itemNameData }: { itemNameData: ItemName[] }) {
  const {
    newItemName,
    setNewItemName,
    errorMessage,
    setErrorMessage,
    loading,
    handleItemAdd,
    handleItemDelete,
    open,
    selectedItem,
    openDialog,
    closeDialog,
  } = useItemManagement();

  return (
    <Box>
      <AddItemForm
        handleItemAdd={handleItemAdd}
        newItemName={newItemName}
        setNewItemName={setNewItemName}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        loading={loading}
      />
      <Box sx={{ ml: 2 }}>
        {itemNameData.length === 0 && (
          <Typography variant="h5" color="text.secondary" sx={{ mt: 4 }}>
            Loading...
          </Typography>
        )}
        <Box
          sx={{
            ...gridCommon,
          }}
        >
          <ItemList itemNameData={itemNameData} openDialog={openDialog} />
          <ItemDeleteDialog
            handleItemDelete={handleItemDelete}
            open={open}
            selectedItem={selectedItem}
            closeDialog={closeDialog}
            loading={loading}
          />
        </Box>
      </Box>
    </Box>
  );
}
