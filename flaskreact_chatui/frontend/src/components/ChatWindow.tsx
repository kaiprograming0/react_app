import ChatMessage, { type Message } from "./ChatMessage"

type Props = {
  messages: Message[]
}

function ChatWindow({ messages }: Props) {
  return (
    <section className="message-area">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
        />
      ))}
    </section>
  )
}

export default ChatWindow