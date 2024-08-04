'use client'
import {Stack} from '@mui/material'
import Dashboard from './dashboard'
import Sidebar from './sidebar'
import { Box, Toolbar } from '@mui/material'
import Header from './header'

const Homepage = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Header />
    <Box sx={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
        <Toolbar />
        <Dashboard />
      </Box>
    </Box>
  </Box>
)

export default Homepage