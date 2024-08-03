"use client";

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import { firestore } from '../app/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { addItem, removeItem, updateItem } from '../utils/itemController';

export default function Dashboard() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateInventory = async () => {
    setLoading(true);
    const snapshot = await getDocs(collection(firestore, 'inventory'));
    const inventoryList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setInventory(inventoryList);
    setLoading(false);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleAddItem = async () => {
    if (itemName && itemQuantity) {
      const quantity = Math.max(0, parseInt(itemQuantity, 10) || 0);
      await addItem({ name: itemName.trim(), quantity });
      await updateInventory();
      handleClose();
    }
  };

  const handleEditItem = async () => {
    if (editingItem && itemName && itemQuantity) {
      const quantity = Math.max(0, parseInt(itemQuantity, 10) || 0);
      await updateItem(editingItem.name, { name: itemName.trim(), quantity });
      await updateInventory();
      handleClose();
    }
  };

  const handleRemoveItem = async (name) => {
    await removeItem(name);
    await updateInventory();
  };

  const handleIncreaseQuantity = async (name, currentQuantity) => {
    await updateItem(name, { name, quantity: currentQuantity + 1 });
    await updateInventory();
  };

  const handleOpen = (item = null) => {
    if (item) {
      setEditingItem(item);
      setItemName(item.name || '');
      setItemQuantity(item.quantity ? item.quantity.toString() : '');
    } else {
      setEditingItem(null);
      setItemName('');
      setItemQuantity('');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
    setItemName('');
    setItemQuantity('');
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', padding: 4 }}>
      <Typography variant="h3" color="primary" gutterBottom>
        Inventory Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => handleOpen()}
        sx={{ mb: 3 }}
      >
        Add New Item
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <List sx={{ width: '100%' }}>
          {inventory.map(({ id, name, quantity }) => (
            <React.Fragment key={id}>
              <ListItem>
                <ListItemText
                  primary={name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Unnamed Item'}
                  secondary={`Quantity: ${quantity || 0}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="increase" onClick={() => handleIncreaseQuantity(name, quantity)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpen({ id, name, quantity })}>
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
      )}

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
    </Box>
  );
}