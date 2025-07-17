'use client'

import { useEffect, useState } from 'react'

interface MemoryLog {
  id: number
  content: string
  created_at: string
}

export default function MemoryPage() {
  const [logs, setLogs] = useState<MemoryLog[]>([])

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await fetch('/api/memory')
      const data = await res.json()
      setLogs(data.logs)
    }
    fetchLogs()
  }, [])

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow rounded p-4 space-y-4">
        <h1 className="text-xl font-bold">🧠 Neo’s Memory Logs</h1>

        {logs.length === 0 ? (
          <p>No memory stored yet...</p>
        ) : (
          logs.map(log => (
            <div key={log.id} className="p-3 bg-gray-50 border rounded mb-2">
              <p className="whitespace-pre-wrap">{log.content}</p>
              <p className="text-sm text-gray-400 mt-1">🕒 {new Date(log.created_at).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
