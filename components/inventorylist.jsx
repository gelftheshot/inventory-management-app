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

  if (inventory.length === 0) {
    return <Typography>No items in this category.</Typography>;
  }

  return (
    <List sx={{ width: '100%' }}>
      {inventory.map((item) => (
        <React.Fragment key={item.id}>
          <ListItem>
            <ListItemText
              primary={item.name ? item.name.charAt(0).toUpperCase() + item.name.slice(1) : 'Unnamed Item'}
              secondary={`Quantity: ${item.quantity || 0} | Category: ${item.category}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="increase" onClick={() => handleIncreaseQuantity(item)}>
                <AddIcon />
              </IconButton>
              <IconButton edge="end" aria-label="decrease" onClick={() => handleDecreaseQuantity(item)}>
                <RemoveIcon />
              </IconButton>
              <IconButton edge="end" aria-label="edit" onClick={() => handleOpen(item)}>
                <EditIcon />
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