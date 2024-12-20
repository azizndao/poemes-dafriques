import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Author } from '../../../types/author'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { AuthorsTable } from './authors-table'
import { CreateAuthorDialog } from './create-author-dialog'
import { EditAuthorDialog } from './edit-author-dialog'

interface AuthorsContentProps {
  authors: Author[]
}

export function AuthorsContent({ authors }: AuthorsContentProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAuthors = useMemo(() => {
    if (!searchQuery.trim()) return authors

    const query = searchQuery.toLowerCase()
    return authors.filter((author) => 
      author.firstName.toLowerCase().includes(query) ||
      author.lastName.toLowerCase().includes(query)
    )
  }, [authors, searchQuery])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Auteurs</h1>
          <Input
            placeholder="Rechercher des auteurs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-auto w-[300px]"
          />
        <Button onClick={() => setCreateDialogOpen(true)} >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un auteur
        </Button>
      </div>

      <AuthorsTable 
        authors={filteredAuthors} 
        onEdit={setEditingAuthor} 
      />

      <CreateAuthorDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />

      <EditAuthorDialog 
        author={editingAuthor} 
        open={!!editingAuthor} 
        onOpenChange={() => setEditingAuthor(null)} 
      />
    </div>
  )
} 