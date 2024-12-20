import { useNavigate } from '@tanstack/react-router'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatDate } from '../../../lib/utils'
import type { Poem } from '../../../types/poem'
import { Button } from '../../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'

interface PoemsTableProps {
  poems: Poem[]
  onEdit: (poem: Poem) => void
}

export function PoemsTable({ poems, onEdit }: PoemsTableProps) {
  const navigate = useNavigate()

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`http://localhost:8080/api/poems/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete poem')
      
      toast.success('Poem deleted successfully')
      navigate({ to: '/dashboard/poems' })
    } catch (error) {
      toast.error('Failed to delete poem')
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">Index</TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>Auteur</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Créé</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {poems.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-muted-foreground">
              Aucune poème trouvé
            </TableCell>
          </TableRow>
        ) : (
          poems.map((poem, index) => (
            <TableRow key={poem.id} onClick={() => navigate({ to: `/poems/${poem.id}` })}>
              <TableCell className="w-[100px] text-center">
                {index + 1}
              </TableCell>
              <TableCell>{poem.title}</TableCell>
              <TableCell>
                {poem.author.firstName} {poem.author.lastName}
              </TableCell>
              <TableCell>{formatDate(poem.date)}</TableCell>
              <TableCell>{formatDate(poem.createdAt)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(poem)}
                  >
                    <Edit className="w-4 h-4 stroke-yellow-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(poem.id)}
                  >
                    <Trash2 className="w-4 h-4 stroke-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
} 