import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { addItem } from '../utils/itemController';

export default function UploadPhotoButton({ updateInventory }) {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('/api/sendphoto', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log('Identified item:', data.itemName);
      console.log('Category:', data.category);
      
      // Add the identified item to the inventory with its category
      await addItem({ name: data.itemName, quantity: 1, category: data.category });

      // Refresh the inventory list
      await updateInventory();

    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={loading ? <CircularProgress size={24} /> : <UploadIcon />}
          disabled={loading}
          sx={{ 
            mb: { xs: 2, sm: 3 },
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          {loading ? 'Analyzing...' : 'Upload Photo'}
        </Button>
      </label>
    </>
  );
}