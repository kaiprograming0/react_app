import { useState } from "react"
import "./App.css"

import type { Message } from "./components/ChatMessage"
import ChatWindow from "./components/ChatWindow"
import ChatInput from "./components/ChatInput"

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "今日は！何でも質問してください。",
    },
  ])

  const [input, setInput] = useState("")

  const handleSend = () => {
    const trimmedInput = input.trim()

    if (!trimmedInput) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedInput,
    }

    const assistantMessage: Message = {
      id: Date.now() + 1,
      role: "assistant",
      content: "これはダミー回答です。次のステップでRAGと接続します。",
    }

    setMessages((prev) => [
      ...prev,
      userMessage,
      assistantMessage,
    ])

    setInput("")
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>RAG Chat</h2>

        <button className="new-chat">
          ＋ 新しいチャット
        </button>

        <p className="sidebar-label">チャット履歴</p>
      </aside>

      <main className="chat-container">
        <header className="chat-header">
          <h2>AI Chat Assistant</h2>
        </header>

        <ChatWindow messages={messages} />

        <ChatInput
          input={input}
          onInputChange={setInput}
          onSend={handleSend}
        />
      </main>
    </div>
  )
}

export default App