import React from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import InventoryList from './inventorylist';
import AddItemButton from './additembutton';
import UploadPhotoButton from './uploadphotobutton';
import AddEditItemDialog from './addedititemdialog';
import { useInventory } from './useInventory';

export default function Dashboard({ selectedCategory }) {
  const {
    inventory,
    loading,
    open,
    itemName,
    itemQuantity,
    itemCategory,
    editingItem,
    categories,
    handleOpen,
    handleClose,
    handleAddItem,
    handleEditItem,
    handleRemoveItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    setItemName,
    setItemQuantity,
    setItemCategory,
    updateInventory,
  } = useInventory();

  const filteredInventory = selectedCategory === 'All' 
    ? inventory 
    : inventory.filter(item => item.category === selectedCategory);

  return (
    <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" color="primary" gutterBottom>
              Inventory Management
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <AddItemButton handleOpen={handleOpen} />
              <UploadPhotoButton updateInventory={updateInventory} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <InventoryList
              inventory={filteredInventory}
              loading={loading}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleOpen={handleOpen}
              handleRemoveItem={handleRemoveItem}
            />
          </Paper>
        </Grid>
      </Grid>
      <AddEditItemDialog
        open={open}
        editingItem={editingItem}
        itemName={itemName}
        itemQuantity={itemQuantity}
        itemCategory={itemCategory}
        categories={categories}
        handleClose={handleClose}
        handleAddItem={handleAddItem}
        handleEditItem={handleEditItem}
        setItemName={setItemName}
        setItemQuantity={setItemQuantity}
        setItemCategory={setItemCategory}
      />
    </Box>
  );
}