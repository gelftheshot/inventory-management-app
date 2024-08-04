import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, Box, Divider } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import CategoryIcon from '@mui/icons-material/Category';
import { predefinedCategories } from '../utils/categories';

export default function Sidebar({ selectedCategory, setSelectedCategory }) {
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Box
      sx={{
        width: 350,
        height: '100%',
        overflow: 'auto',
        bgcolor: 'background.paper',
      }}
    >
      <List sx={{ padding: 0 }}>
        <ListItem>
          <Typography variant="h6" color="primary">Categories</Typography>
        </ListItem>
        <Divider />
        <ListItem 
          button 
          selected={selectedCategory === 'All'}
          onClick={() => handleCategorySelect('All')}
          sx={{ 
            '&.Mui-selected': { 
              bgcolor: 'primary.light',
              '&:hover': { bgcolor: 'primary.light' },
            },
          }}
        >
          <ListItemIcon>
            <CategoryIcon color={selectedCategory === 'All' ? 'primary' : 'inherit'} />
          </ListItemIcon>
          <ListItemText primary="All Items" />
        </ListItem>
        {predefinedCategories.map((category) => (
          <ListItem 
            button 
            key={category} 
            selected={selectedCategory === category}
            onClick={() => handleCategorySelect(category)}
            sx={{ 
              '&.Mui-selected': { 
                bgcolor: 'primary.light',
                '&:hover': { bgcolor: 'primary.light' },
              },
            }}
          >
            <ListItemIcon>
              <FolderIcon color={selectedCategory === category ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}