"use client";

import React, { useState } from 'react';
import { Box, Typography, Paper, Container, Grid } from '@mui/material';
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

  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredInventory = selectedCategory === 'All' 
    ? inventory 
    : inventory.filter(item => item.category === selectedCategory);

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                  handleOpen={handleOpen}
                  handleRemoveItem={handleRemoveItem}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
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
    </Box>
  );
};

export default Dashboard;