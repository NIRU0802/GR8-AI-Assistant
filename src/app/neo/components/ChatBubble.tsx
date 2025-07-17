'use client'

import { Box, Paper, Avatar, Typography } from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'

interface Msg {
  role: 'user' | 'assistant'
  content: string
  typing?: boolean
}

export default function ChatBubble({ role, content, typing }: Msg) {
  const isUser = role === 'user'

  return (
    <Box sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', my: 1 }}>
      {!isUser && (
        <Avatar sx={{ bgcolor: 'primary.main', mr: 1, width: 32, height: 32 }}>
          <SmartToyIcon fontSize="small" />
        </Avatar>
      )}

      <Paper
        sx={{
          p: 1.5,
          maxWidth: '75%',
          borderRadius: 2,
          bgcolor: isUser ? 'primary.main' : 'background.paper',
          color: isUser ? 'primary.contrastText' : 'text.primary',
          boxShadow: 1,
        }}
      >
        {typing ? (
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            …typing
          </Typography>
        ) : (
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
            {content}
          </Typography>
        )}
      </Paper>

      {isUser && (
        <Avatar sx={{ bgcolor: 'secondary.main', ml: 1, width: 32, height: 32 }}>
          <PersonIcon fontSize="small" />
        </Avatar>
      )}
    </Box>
  )
}
