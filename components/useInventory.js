import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../app/firebase';
import { addItem, removeItem, updateItem } from '../utils/itemController';

export const useInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([
    'Electronics',
    'Clothing',
    'Food',
    'Beverages',
    'Furniture',
    'Kitchen Appliances',
    'Home Decor',
    'Books',
    'Toys',
    'Sports Equipment',
    'Tools',
    'Gardening',
    'Automotive',
    'Health and Beauty',
    'Cleaning Supplies',
    'Office Supplies',
    'Pet Supplies',
    'Jewelry',
    'Art Supplies',
    'Music Instruments',
    'Outdoor Equipment',
    'Luggage',
    'Crafts',
    'Baby Items',
    'Medications',
    'Party Supplies',
    'Seasonal Decorations',
    'Stationery',
    'Collectibles',
    'Other'
  ]);

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
    if (itemName && itemQuantity && itemCategory) {
      const quantity = Math.max(0, parseInt(itemQuantity, 10) || 0);
      await addItem({ name: itemName.trim(), quantity, category: itemCategory });
      await updateInventory();
      handleClose();
    }
  };

  const handleEditItem = async () => {
    if (editingItem && itemName && itemQuantity && itemCategory) {
      const quantity = Math.max(0, parseInt(itemQuantity, 10) || 0);
      await updateItem(editingItem.name, { name: itemName.trim(), quantity, category: itemCategory });
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
      setItemCategory(item.category || '');
    } else {
      setEditingItem(null);
      setItemName('');
      setItemQuantity('');
      setItemCategory('');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
    setItemName('');
    setItemQuantity('');
    setItemCategory('');
  };

  const getUniqueCategories = () => {
    const uniqueCategories = new Set(inventory.map(item => item.category));
    return Array.from(uniqueCategories).sort();
  };

  return {
    inventory,
    loading,
    open,
    itemName,
    itemQuantity,
    itemCategory,
    editingItem,
    categories: getUniqueCategories(),
    handleOpen,
    handleClose,
    handleAddItem,
    handleEditItem,
    handleRemoveItem,
    handleIncreaseQuantity,
    setItemName,
    setItemQuantity,
    setItemCategory,
    updateInventory,
  };
};