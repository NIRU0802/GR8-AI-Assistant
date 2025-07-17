'use client'

import { useState } from 'react'
import { Box, TextField, IconButton, Paper } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

export default function ChatInput({ onSend }: { onSend: (msg: string) => void }) {
  const [text, setText] = useState('')

  const submit = () => {
    if (!text.trim()) return
    onSend(text)
    setText('')
  }

  return (
    <Paper sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Message GR8..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            submit()
          }
        }}
      />
      <IconButton color="primary" onClick={submit}>
        <SendIcon />
      </IconButton>
    </Paper>
  )
}
