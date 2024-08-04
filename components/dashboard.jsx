"use client";

import React from 'react';
import { Box, Typography } from '@mui/material';
import InventoryList from './inventorylist';
import AddItemButton from './additembutton';
import UploadPhotoButton from './uploadphotobutton';
import AddEditItemDialog from './addedititemdialog';
import { useInventory } from './useInventory';

const Dashboard = () => {
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
    setItemName,
    setItemQuantity,
    setItemCategory,
    updateInventory
  } = useInventory();

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', padding: 4 }}>
      <Typography variant="h3" color="primary" gutterBottom>
        Inventory Management
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <AddItemButton handleOpen={handleOpen} />
        <UploadPhotoButton updateInventory={updateInventory} />
      </Box>
      <InventoryList
        inventory={inventory}
        loading={loading}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleOpen={handleOpen}
        handleRemoveItem={handleRemoveItem}
      />
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
};

export default Dashboard;