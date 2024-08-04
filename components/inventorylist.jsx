import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Box,
  CircularProgress, 
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

const InventoryList = ({
  inventory,
  loading,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleOpen,
  handleRemoveItem,
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const inventoryItems = Object.entries(inventory);

  if (inventoryItems.length === 0) {
    return <Typography>No items in inventory.</Typography>;
  }

  return (
    <List sx={{ width: '100%' }}>
      {inventoryItems.map(([itemId, item]) => (
        <React.Fragment key={itemId}>
          <ListItem>
            <ListItemText
              primary={item.name}
              secondary={`Quantity: ${item.quantity} | Category: ${item.category}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="increase" onClick={() => handleIncreaseQuantity(itemId)}>
                <AddIcon />
              </IconButton>
              <IconButton edge="end" aria-label="decrease" onClick={() => handleDecreaseQuantity(itemId)}>
                <RemoveIcon />
              </IconButton>
              <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(itemId)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveItem(itemId)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
};

export default InventoryList;