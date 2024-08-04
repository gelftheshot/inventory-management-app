import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../app/firebase';
import { addItem, removeItem, updateItem } from '../utils/itemController';

export const useInventory = () => {
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

  return {
    inventory,
    loading,
    open,
    itemName,
    itemQuantity,
    editingItem,
    handleOpen,
    handleClose,
    handleAddItem,
    handleEditItem,
    handleRemoveItem,
    handleIncreaseQuantity,
    setItemName,
    setItemQuantity,
  };
};