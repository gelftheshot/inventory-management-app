import {Stack} from '@mui/material'
import Dashboard from './dashboard'
import Sidebar from './sidebar'
import { Box } from '@mui/material'

const homepage = () => {
  return (
    <Box>
        <Stack direction='row' spacing={2}>
        <Box style={{ backgroundColor: '#f0f0f0', width: '350px' }}>
            <Sidebar />
        </Box>
            <Dashboard />
        </Stack>
    </Box>
  )
}

export default homepage