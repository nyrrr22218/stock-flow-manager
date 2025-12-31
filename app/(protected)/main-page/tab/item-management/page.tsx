import { getItems } from '@/app/actions/item-management-actions';
import ItemManagement from '@/components/tab/item-management/item-add';
import { Box } from '@mui/material';

export default async function ItemManagementPage() {
  const itemData = await getItems();
  if (!Array.isArray(itemData)) {
    return <Box>error: {itemData.error}</Box>;
  }
  return <ItemManagement itemNameData={itemData} />;
}
