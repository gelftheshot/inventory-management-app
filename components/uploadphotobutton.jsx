import React from 'react';
import { Button } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const UploadPhotoButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<UploadIcon />}
      onClick={() => {/* Implement photo upload logic */}}
      sx={{ 
        mb: { xs: 2, sm: 3 },
        width: { xs: '100%', sm: 'auto' }
      }}
    >
      Upload photo
    </Button>
  );
};

export default UploadPhotoButton;