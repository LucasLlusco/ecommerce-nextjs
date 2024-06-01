'use client';
import { useChat } from 'ai/react';
import styles from "./Chat.module.sass";

interface chatProps {
  agent: string
}

const Chat = ({agent}: chatProps) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [ 
      {
        id: '1', 
        role: 'system', 
        content: agent 
      }
    ],
  });

  return (
    <main className={styles.Chat} >
      <h1 className={styles.Chat__title}>Ask anything, buy everything</h1>
      <section className={styles.Chat__messages}>
        {messages
          .filter(m => m.role !== 'system')
          .map(m => {
            return (
              <span 
                key={m.id} 
                className={`${styles.Chat__message} ${m.role === "assistant" ? `${styles.Chat__message__assistant}` : `${styles.Chat__message__user}`}`}>
                <div className={styles.Chat__message__icon}>
                  {m.role === "assistant" ? "🤖" : "😊"}
                </div>
                <div>
                  {m.content}
                </div>
              </span>
            )
          }
        )}
      </section>
      <form onSubmit={handleSubmit} className={styles.Chat__form}>
        <input
          className={styles.Chat__input}
          value={input}
          onChange={handleInputChange}
          placeholder="What would you like to buy?"
        />
        <button
          className={styles.Chat__button}
        >
          Send
        </button>
      </form>
    </main>
  )
}

export default Chat