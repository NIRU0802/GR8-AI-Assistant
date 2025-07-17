import ChatBox from '../neo/components/ChatBox'
import { Box, Drawer, Toolbar, Typography } from '@mui/material'

export default function ChatPage() {
  // Sidebar width like ChatGPT
  const drawerWidth = 260

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar (md+ screens) */}
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth, xs: 0 },
          flexShrink: 0,
          display: { xs: 'none', md: 'block' },
          borderRight: 1,
          borderColor: 'divider',
        }}
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              p: 2,
            },
          }}
        >
          <Toolbar />
          <Typography variant="h6" gutterBottom>Neo Chats</Typography>
          {/* TODO: Add conversation list */}
        </Drawer>
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ flexGrow: 1 }}>
        <ChatBox />
      </Box>
    </Box>
  )
}
