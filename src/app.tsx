import { useEffect, useRef, useState } from "react"

export interface Card {
  id: string
  name: string
  img: string
  count: number
  rarity: string
}

export interface Deck {
  id: string
  totalCards: number
  heroCard: Card
  cardsByRarity: {
    COMMON: number
    RARE: number
    UNIQUE: number
  }
  cards: Card[]
}

export default function App() {
  const [focusedCard, setFocusedCard] = useState<Card | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket(import.meta.env.VITE_WS_URL || "ws://localhost:8787/")
    wsRef.current = ws
    ws.onopen = () => {
      console.log("WebSocket connection opened")
    }
    ws.onmessage = (event) => {
      console.log("Received message:", event.data)
      try {
        const message = JSON.parse(event.data)
        if (message.type === "card") {
          setFocusedCard(message.card)
        } else if (message.type === "clear") {
          setFocusedCard(null)
        }
      } catch (err) {
        console.error("Failed to parse WebSocket message:", err)
      }
    }
    ws.onclose = () => {
      console.log("WebSocket connection closed")
    }
    ws.onerror = (error) => {
      console.error("WebSocket error:", error)
    }
    return () => {
      ws.close()
    }
  }, [])

  return (
    <div className="min-h-screen bg-red-700 flex items-center justify-center w-full">
      <div className="flex-1 max-w-lg">
        <img src={focusedCard?.img || 'https://cf.geekdo-images.com/0W7Yyq6YW1FhuyOxQdAXtA__imagepage/img/APxoMbANKHXIiEUKOb7CKrjKXdQ=/fit-in/900x600/filters:no_upscale():strip_icc()/pic7698195.jpg'} alt={focusedCard?.name || 'card'} className="w-full h-auto rounded-lg" />
      </div>
    </div>
  )
}