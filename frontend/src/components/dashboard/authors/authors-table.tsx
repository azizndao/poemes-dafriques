import { useNavigate } from '@tanstack/react-router'
import { Edit, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { formatDate } from '../../../lib/utils'
import type { Author } from '../../../types/author'
import { Button } from '../../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table'

interface AuthorsTableProps {
  authors: Author[]
  onEdit: (author: Author) => void
}

export function AuthorsTable({ authors, onEdit }: AuthorsTableProps) {
  const navigate = useNavigate()

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`http://localhost:8080/api/authors/${id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete author')
      
      toast.success('Author deleted successfully')
      navigate({ to: '/dashboard/authors' })
    } catch (error) {
      toast.error('Failed to delete author')
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-center">Index</TableHead>
          <TableHead>Nom</TableHead>
          <TableHead>Prénom</TableHead>
          <TableHead>Poèmes</TableHead>
          <TableHead>Créé</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {authors.map((author, index) => (
          <TableRow key={author.id} onClick={() => navigate({ to: `/authors/${author.id}` })}>
            <TableCell className='text-center font-medium'>{index + 1}</TableCell>
            <TableCell>{author.firstName}</TableCell>
            <TableCell>{author.lastName}</TableCell>
            <TableCell>{author.poemCount} poèmes</TableCell>
            <TableCell>
              {formatDate(author.createdAt)}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(author)}
                >
                  <Edit className="w-4 h-4 stroke-yellow-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(author.id)}
                >
                  <Trash2 className="w-4 h-4 stroke-red-500" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 