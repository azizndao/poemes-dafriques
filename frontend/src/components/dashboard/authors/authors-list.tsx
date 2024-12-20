import { Book, Pencil, Trash } from 'lucide-react'
import type { Author } from '../../../types/author'
import { Button } from '../../ui/button'

interface AuthorsListProps {
  authors: Author[]
}

export function AuthorsList({ authors }: AuthorsListProps) {
  return (
    <div className="space-y-4">
      {authors.map((author) => (
        <div
          key={author.id}
          className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
        >
          <div>
            <div className="font-medium">
              {author.firstName} {author.lastName}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Book className="h-4 w-4" />
              <span>{author.poems.length} poems</span>
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