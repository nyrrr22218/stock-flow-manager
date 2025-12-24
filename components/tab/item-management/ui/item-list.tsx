import { ItemName } from '@/schemas';
import { paperCommon } from '@/styles/commons';
import { Paper, Typography, Button } from '@mui/material';

type ItemList = {
  itemNameList: ItemName[];
  openDialog: (item: ItemName) => void;
};

export const ItemList = ({ itemNameList, openDialog }: ItemList) => {
  return (
    <>
      {itemNameList.map((item) => (
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
