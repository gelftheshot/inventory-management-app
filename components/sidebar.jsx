import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, Box, Divider, Toolbar } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import CategoryIcon from '@mui/icons-material/Category';
import { useInventory } from './useInventory';

export default function Sidebar({ setSelectedCategory }) {
  const { categories } = useInventory();
  const [selectedCategoryState, setSelectedCategoryState] = React.useState('All');

  const handleCategorySelect = (category) => {
    setSelectedCategoryState(category);
    setSelectedCategory(category);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 350,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 350, boxSizing: 'border-box' },
      }}
    >
      <Toolbar /> {/* This empty Toolbar pushes content below the AppBar */}
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <ListItem>
            <Typography variant="h6" color="primary">Categories</Typography>
          </ListItem>
          <Divider />
          <ListItem 
            button 
            selected={selectedCategoryState === 'All'}
            onClick={() => handleCategorySelect('All')}
            sx={{ 
              '&.Mui-selected': { 
                bgcolor: 'primary.light',
                '&:hover': { bgcolor: 'primary.light' },
              },
            }}
          >
            <ListItemIcon>
              <CategoryIcon color={selectedCategoryState === 'All' ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary="All Items" />
          </ListItem>
          {categories && categories.length > 0 && categories.map((category) => (
            <ListItem 
              button 
              key={category} 
              selected={selectedCategoryState === category}
              onClick={() => handleCategorySelect(category)}
              sx={{ 
                '&.Mui-selected': { 
                  bgcolor: 'primary.light',
                  '&:hover': { bgcolor: 'primary.light' },
                },
              }}
            >
              <ListItemIcon>
                <FolderIcon color={selectedCategoryState === category ? 'primary' : 'inherit'} />
              </ListItemIcon>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}