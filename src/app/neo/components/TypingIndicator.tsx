'use client'

import { Box, keyframes } from '@mui/material'

const bounce = keyframes`
  0% { transform: translateY(0); opacity: .5; }
  50% { transform: translateY(-3px); opacity: 1; }
  100% { transform: translateY(0); opacity: .5; }
`

export default function TypingIndicator() {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: .5,
        px: 2,
        py: 1,
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: 1,
      }}
    >
      {[0,1,2].map(i => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: 'text.secondary',
            animation: `${bounce} 1s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </Box>
  )
}
