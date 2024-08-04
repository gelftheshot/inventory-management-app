import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const AddEditItemDialog = ({
  open,
  editingItem,
  itemName,
  itemQuantity,
  handleClose,
  handleAddItem,
  handleEditItem,
  setItemName,
  setItemQuantity,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Item Name"
          type="text"
          fullWidth
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Quantity"
          type="number"
          fullWidth
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={editingItem ? handleEditItem : handleAddItem} color="primary">
          {editingItem ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditItemDialog;