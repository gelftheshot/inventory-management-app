'use client'
import {Stack} from '@mui/material'
import Dashboard from './dashboard'
import Sidebar from './sidebar'
import { Box, Toolbar } from '@mui/material'
import Header from './header'
import { useState } from 'react'

const Homepage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <Box sx={{ width: 350, flexShrink: 0, overflow: 'auto', borderRight: 1, borderColor: 'divider' }}>
          <Sidebar 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
          />
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <Dashboard selectedCategory={selectedCategory} />
        </Box>
      </Box>
    </Box>
  )
}

export default Homepage