import { useState } from 'react'
import './App.css'

type Message = {
  id: number
  role: "user" | "assistant"
  content: string
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: '今日は！何でも質問してください。',
    },
  ])

  const [input, setInput] = useState('')

  const [enterCount, setEnterCount] = useState(0)

  const handleSend = () => {
    const trimmedInput = input.trim()

    if (!trimmedInput) return

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: trimmedInput
    }

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: 'assistant',
      content: 'これはダミー回答です。次のステップでRAGと接続します。',
    }

    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setInput('')
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>RAG Chat</h2>
        <button className="new-chat">＋ 新しいチャット</button>
        <p className="sidebar-label">チャット履歴</p>
      </aside>

      <main className="chat-container">
        <header className="chat-header">
          <h2>AI Chat Assistant</h2>
        </header>

        <section className="message-area">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.role}`}
            >
              <div className="message-role">
                {message.role === 'user' ? 'You' : 'AI'}
              </div>
              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))}
        </section>

        <div className="input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setEnterCount(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()

                if (enterCount === 0) {
                  setEnterCount(1)
                } else {
                  handleSend()
                  setEnterCount(0)
                }
              }
            }}
            placeholder="メッセージを入力してください..."
          />

          <button onClick={handleSend}>
            送信
          </button>
        </div>
      </main>
    </div>
  )
}

export default App