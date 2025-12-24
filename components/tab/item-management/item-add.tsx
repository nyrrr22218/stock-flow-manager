'use client';

import { useItemManagement } from '@/hooks/use-item-management';
import { gridCommon } from '@/styles/commons';
import { Box, Typography } from '@mui/material';
import { ItemName } from '@/schemas';
import { AddItemForm, DeleteItemDialog, ItemList } from '.';

export default function ItemManagement({ itemNameData }: { itemNameData: ItemName[] }) {
  const {
    newItemName,
    setNewItemName,
    errorMessage,
    setErrorMessage,
    itemNameList,
    loading,
    handleItemAdd,
    deleteItem,
    open,
    selectedItem,
    openDialog,
    closeDialog,
  } = useItemManagement(itemNameData);

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
        {itemNameList.length === 0 && (
          <Typography variant="h5" color="text.secondary" sx={{ mt: 4 }}>
            Loading...
          </Typography>
        )}
        <Box
          sx={{
            ...gridCommon,
          }}
        >
          <ItemList itemNameList={itemNameList} openDialog={openDialog} />
          <DeleteItemDialog
            deleteItem={deleteItem}
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
