import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Poem } from '../../../types/poem'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'
import { CreatePoemDialog } from './create-poem-dialog'
import { EditPoemDialog } from './edit-poem-dialog'
import { PoemsTable } from './poems-table'

interface PoemsContentProps {
  poems: Poem[]
}

export function PoemsContent({ poems }: PoemsContentProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null)
  const [searchQuery, setSearchQuery] = useState('')


  const filteredPoems = useMemo(() => {
    if (!searchQuery.trim()) return poems

    const query = searchQuery.toLowerCase()
    return poems.filter((poem) => 
      poem.title.toLowerCase().includes(query) ||
      poem.content.toLowerCase().includes(query) ||
      poem.author.firstName.toLowerCase().includes(query) ||
      poem.author.lastName.toLowerCase().includes(query)
    )
  }, [poems, searchQuery])

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Poèmes</h1>
        <Input
          placeholder="Rechercher des poèmes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="ml-auto w-[300px]"
        />
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une poème
        </Button>
      </div>

      <PoemsTable 
        poems={filteredPoems} 
        onEdit={setEditingPoem}
      />

      <CreatePoemDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen} 
      />

      <EditPoemDialog 
        poem={editingPoem} 
        open={!!editingPoem} 
        onOpenChange={() => setEditingPoem(null)} 
      />
    </div>
  )
} 