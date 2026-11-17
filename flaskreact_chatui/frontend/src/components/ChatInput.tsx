import { useState } from "react"

type Props = {
  input: string
  onInputChange: (value: string) => void
  onSend: () => void
}

function ChatInput({
  input,
  onInputChange,
  onSend,
}: Props) {
  const [enterCount, setEnterCount] = useState(0)

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()

      if (enterCount === 0) {
        setEnterCount(1)
      } else {
        onSend()
        setEnterCount(0)
      }
    }
  }

  return (
    <div className="input-area">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          onInputChange(e.target.value)
          setEnterCount(0)
        }}
        onKeyDown={handleKeyDown}
        placeholder="メッセージを入力してください..."
      />

      <button onClick={onSend}>
        送信
      </button>
    </div>
  )
}

export default ChatInput