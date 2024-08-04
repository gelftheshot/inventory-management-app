import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AddItemButton = ({ handleOpen }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={() => handleOpen()}
      sx={{ 
        mb: { xs: 2, sm: 3 }, 
        mr: { xs: 0, sm: 2 },
        width: { xs: '100%', sm: 'auto' }
      }}
    >
      Add New Item
    </Button>
  );
};

export default AddItemButton;