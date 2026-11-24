/* Manage chat messages and communicate with the Flask API to retrieve AI responses

 * Execution:
 * 1. Start the Flask backend:
 *    python app.py
 *
 * 2. Start the React frontend:
 *    npm run dev
*/

import { useState } from "react"
import "./App.css"

import type { Message } from "./components/ChatMessage"
import ChatWindow from "./components/ChatWindow"
import ChatInput from "./components/ChatInput"

const API_URL = "http://127.0.0.1:5000/api/chat"

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "こんにちは！何でも質問してください。",
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    const trimmedInput = input.trim()

    if (!trimmedInput || isLoading) return

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedInput,
    }

    // ユーザーの質問を画面に追加
    setMessages((prev) => [...prev, userMessage])

    // 入力欄をクリア
    setInput("")
    setIsLoading(true)

    try {
      // Flask APIに質問を送信
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedInput,
        }),
      })

      const data: {
        answer?: string
        error?: string
      } = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "回答の取得に失敗しました。")
      }

      // Bedrockから返された回答を取得
      const assistantMessage: Message = {
        id: Date.now(),
        role: "assistant",
        content: data.answer || "回答がありませんでした。",
      }

      // 回答を画面に追加
      setMessages((prev) => [...prev, assistantMessage])

    } catch (error) {
      console.error("Chat API Error:", error)

      const errorMessage: Message = {
        id: Date.now(),
        role: "assistant",
        content:
          error instanceof Error
            ? `エラーが発生しました：${error.message}`
            : "回答の取得に失敗しました。",
      }

      setMessages((prev) => [...prev, errorMessage])

    } finally {
      setIsLoading(false)
    }
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

        {isLoading && (
          <p className="loading-message">
            回答を生成しています...
          </p>
        )}

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
