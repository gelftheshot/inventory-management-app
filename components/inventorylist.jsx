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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';

const InventoryList = ({
  inventory,
  loading,
  handleIncreaseQuantity,
  handleOpen,
  handleRemoveItem,
  updateInventory,
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%' }}>
      {inventory.map(({ id, name, quantity, category }) => (
        <React.Fragment key={id}>
          <ListItem>
            <ListItemText
              primary={name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Unnamed Item'}
              secondary={`Quantity: ${quantity || 0} | Category: ${category}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="increase" onClick={() => handleIncreaseQuantity({ name, quantity, category })}>
                <AddIcon />
              </IconButton>
              <IconButton edge="end" aria-label="edit" onClick={() => handleOpen({ id, name, quantity, category })}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="remove" onClick={() => handleRemoveItem(name)}>
                <RemoveIcon />
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