import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

export type Message = {
  id: number
  role: "user" | "assistant"
  content: string
}

type Props = {
  message: Message
}

function ChatMessage({ message }: Props) {
  return (
    <div className={`message ${message.role}`}>
      <div className="message-role">
        {message.role === "user" ? "You" : "AI"}
      </div>

      <div className="message-content">
        {message.role === "assistant" ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        ) : (
          message.content
        )}
      </div>
    </div>
  )
}

export default ChatMessage