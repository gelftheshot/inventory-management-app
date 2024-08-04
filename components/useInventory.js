import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../app/firebase';

export function useInventory() {
  const [inventory, setInventory] = useState({});
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
      const inventoryData = {};
      const categoriesSet = new Set();
      snapshot.forEach(doc => {
        const data = doc.data();
        inventoryData[doc.id] = {
          name: data.name,
          quantity: data.quantity,
          category: data.category
        };
        categoriesSet.add(data.category);
      });
      setInventory(inventoryData);
      setCategories(Array.from(categoriesSet).sort());
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    updateInventory();
  }, [updateInventory]);

  const handleOpen = (itemId = null) => {
    if (itemId) {
      const item = inventory[itemId];
      setEditingItem(itemId);
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

  const handleAddOrUpdateItem = async () => {
    console.log("handleAddOrUpdateItem called");
    console.log("itemName:", itemName);
    console.log("itemQuantity:", itemQuantity);
    console.log("itemCategory:", itemCategory);

    if (itemName && itemQuantity && itemCategory) {
      try {
        const itemId = editingItem || itemName.trim().toLowerCase();
        console.log("itemId:", itemId);

        const newItem = {
          name: itemName.trim(),
          quantity: parseInt(itemQuantity, 10),
          category: itemCategory.trim()
        };
        console.log("newItem:", newItem);

        await setDoc(doc(firestore, 'inventory', itemId), newItem);
        console.log("Item added/updated in Firestore");
        
        // Update local state
        setInventory(prevInventory => {
          const updatedInventory = {
            ...prevInventory,
            [itemId]: newItem
          };
          console.log("Updated inventory:", updatedInventory);
          return updatedInventory;
        });
        
        // Update categories if necessary
        if (!categories.includes(newItem.category)) {
          setCategories(prevCategories => {
            const updatedCategories = [...prevCategories, newItem.category].sort();
            console.log("Updated categories:", updatedCategories);
            return updatedCategories;
          });
        }
        
        handleClose();
        console.log("Dialog closed");
      } catch (error) {
        console.error("Error adding/updating item:", error);
      }
    } else {
      console.log("Invalid input: some fields are empty");
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await deleteDoc(doc(firestore, 'inventory', itemId));
      
      // Update local state
      setInventory(prevInventory => {
        const newInventory = { ...prevInventory };
        delete newInventory[itemId];
        return newInventory;
      });
      
      // Update categories if necessary
      const remainingCategories = new Set(Object.values(inventory).map(item => item.category));
      setCategories(Array.from(remainingCategories).sort());
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleIncreaseQuantity = async (itemId) => {
    try {
      const item = inventory[itemId];
      const updatedQuantity = item.quantity + 1;
      await setDoc(doc(firestore, 'inventory', itemId), { ...item, quantity: updatedQuantity });
      
      // Update local state
      setInventory(prevInventory => ({
        ...prevInventory,
        [itemId]: { ...item, quantity: updatedQuantity }
      }));
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecreaseQuantity = async (itemId) => {
    try {
      const item = inventory[itemId];
      if (!item) {
        console.error("Item not found:", itemId);
        return;
      }
      const updatedQuantity = Math.max(0, item.quantity - 1);
      
      // Update Firestore
      await setDoc(doc(firestore, 'inventory', itemId), { ...item, quantity: updatedQuantity });
      
      // Update local state
      setInventory(prevInventory => ({
        ...prevInventory,
        [itemId]: { ...item, quantity: updatedQuantity }
      }));

      console.log(`Decreased quantity for ${itemId}. New quantity: ${updatedQuantity}`);
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
    handleAddOrUpdateItem,
    handleRemoveItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    setItemName,
    setItemQuantity,
    setItemCategory,
    updateInventory,
  };
}