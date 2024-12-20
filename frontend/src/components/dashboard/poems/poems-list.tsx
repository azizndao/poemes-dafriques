import { CalendarDays, Pencil, Trash } from 'lucide-react'
import type { Poem } from '../../../types/poem'
import { Button } from '../../ui/button'

interface PoemsListProps {
  poems: Poem[]
}

export function PoemsList({ poems }: PoemsListProps) {
  return (
    <div className="space-y-4">
      {poems.map((poem) => (
        <div
          key={poem.id}
          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
        >
          <div>
            <div className="font-medium">{poem.title}</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>{new Date(poem.date).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
} 