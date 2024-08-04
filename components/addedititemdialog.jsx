import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const AddEditItemDialog = ({
  open,
  editingItem,
  itemName,
  itemQuantity,
  itemCategory,
  handleClose,
  handleAddItem,
  handleEditItem,
  setItemName,
  setItemQuantity,
  setItemCategory,
  categories,
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
        <FormControl fullWidth margin="dense">
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            value={itemCategory}
            onChange={(e) => setItemCategory(e.target.value)}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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