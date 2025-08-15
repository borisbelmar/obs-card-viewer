import type { Card, Deck } from "@/app";
import { cn } from "@/lib/utils";

interface DeckListProps {
  deck: Deck
  onCardClick: (card: Card) => void
  selectedId: string | undefined
}

export default function DeckList({ deck, onCardClick, selectedId }: DeckListProps) {
  return (
    <ul className="grid grid-cols-2 gap-2">
      {deck.cards.map((card) => (
        <li
          key={card.id}
          className={cn(
            "flex items-center gap-2 border p-1 text-xs rounded",
            card.id === selectedId
              ? "border-blue-500"
              : "border-zinc-500 bg-zinc-800 hover:bg-zinc-700 cursor-pointer",
          )}
          onClick={() => onCardClick(card)}
        >
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              card.rarity === "COMMON"
                ? "bg-zinc-500"
                : card.rarity === "RARE"
                ? "bg-blue-500"
                : card.rarity === "UNIQUE"
                ? "bg-yellow-400"
                : "bg-gray-400"
            }`}
          />
          <span>{card.name}</span>
          <span>x{card.count}</span>
        </li>
      ))}
    </ul>
  )
}