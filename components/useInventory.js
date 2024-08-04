import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { firestore } from '../app/firebase';

export function useInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [categories, setCategories] = useState([]);

  const updateInventory = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(firestore, 'inventory'));
      const inventoryList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInventory(inventoryList);
      
      // Update categories
      const uniqueCategories = [...new Set(inventoryList.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateInventory();
  }, [updateInventory]);

  const handleOpen = (item = null) => {
    if (item) {
      setEditingItem(item);
      setItemName(item.name);
      setItemQuantity(item.quantity.toString());
      setItemCategory(item.category);
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

  const handleAddItem = async () => {
    if (itemName && itemQuantity && itemCategory) {
      try {
        const existingItemQuery = query(
          collection(firestore, 'inventory'),
          where('name', '==', itemName.trim()),
          where('category', '==', itemCategory.trim())
        );
        const existingItemSnapshot = await getDocs(existingItemQuery);

        if (!existingItemSnapshot.empty) {
          // Item already exists, update quantity
          const existingItem = existingItemSnapshot.docs[0];
          const newQuantity = parseInt(existingItem.data().quantity, 10) + parseInt(itemQuantity, 10);
          await updateDoc(doc(firestore, 'inventory', existingItem.id), { quantity: newQuantity });
        } else {
          // New item, add to inventory
          const newItem = {
            name: itemName.trim(),
            quantity: parseInt(itemQuantity, 10),
            category: itemCategory.trim()
          };
          await addDoc(collection(firestore, 'inventory'), newItem);
        }
        await updateInventory();
        handleClose();
      } catch (error) {
        console.error("Error adding/updating item:", error);
      }
    }
  };

  const handleEditItem = async () => {
    if (editingItem && itemName && itemQuantity && itemCategory) {
      try {
        const updatedItem = {
          name: itemName.trim(),
          quantity: parseInt(itemQuantity, 10),
          category: itemCategory.trim()
        };
        await updateDoc(doc(firestore, 'inventory', editingItem.id), updatedItem);
        await updateInventory();
        handleClose();
      } catch (error) {
        console.error("Error editing item:", error);
      }
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await deleteDoc(doc(firestore, 'inventory', itemId));
      await updateInventory();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleIncreaseQuantity = async (item) => {
    try {
      const updatedQuantity = item.quantity + 1;
      await updateDoc(doc(firestore, 'inventory', item.id), { quantity: updatedQuantity });
      await updateInventory();
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (item) => {
    try {
      const updatedQuantity = Math.max(0, item.quantity - 1);
      await updateDoc(doc(firestore, 'inventory', item.id), { quantity: updatedQuantity });
      await updateInventory();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  return {
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
  };
}