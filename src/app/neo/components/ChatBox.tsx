'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Divider, Typography, Stack } from '@mui/material'
import ChatBubble from './ChatBubble'
import ChatInput from './ChatInput'
import TypingIndicator from './TypingIndicator'
import ThemeToggle from './ThemeToggle'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello, I’m Neo 🧠. Ask me anything!' },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleSend = async (userMessage: string) => {
    const updated: Message[] = [...messages, { role: 'user', content: userMessage }]
    setMessages(updated)
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      })
      const data = await res.json()
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.reply ?? 'No reply received.' },
      ])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '⚠️ Error getting a response from Neo.' },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <Box
      sx={{
        height: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            textAlign: 'center',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          🧠 Neo - Your Personal AI Assistant
        </Typography>

        <Box sx={{ position: 'absolute', right: 16 }}>
          <ThemeToggle />
        </Box>
      </Box>


      {/* Chat Messages */}
      <Stack
        spacing={2}
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 3,
          py: 2,
        }}
      >
        {messages.map((msg, index) => (
          <ChatBubble key={index} role={msg.role} content={msg.content} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </Stack>

      {/* Input */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <ChatInput onSend={handleSend} />
      </Box>
    </Box>
  )
}
