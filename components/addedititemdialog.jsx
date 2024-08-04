import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

export default function AddEditItemDialog({
  open,
  editingItem,
  itemName,
  itemQuantity,
  itemCategory,
  handleClose,
  handleAddOrUpdateItem,
  setItemName,
  setItemQuantity,
  setItemCategory,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    handleAddOrUpdateItem();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
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
            disabled={!!editingItem}
            required
          />
          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Category"
            type="text"
            fullWidth
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" color="primary">
            {editingItem ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}