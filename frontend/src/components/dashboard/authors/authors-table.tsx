import { useNavigate } from '@tanstack/react-router'
import { Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { request } from '../../../lib/fetch'
import { formatDate } from '../../../lib/utils'
import type { Author } from '../../../types/author'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../ui/alert-dialog'
import { Button } from '../../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table'

interface AuthorsTableProps {
  authors: Author[]
  onEdit: (author: Author) => void
}

export function AuthorsTable({ authors, onEdit }: AuthorsTableProps) {
  const navigate = useNavigate()
  const [deleteAuthor, setDeleteAuthor] = useState<Author | null>(null)

  async function handleDelete(author: Author) {
    try {
      const response = await request(`/authors/${author.id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete author')
      
      toast.success('Author deleted successfully')
      navigate({ to: '/dashboard/authors' })
    } catch (error) {
      toast.error('Failed to delete author')
    } finally {
      setDeleteAuthor(null)
    }
  }

  return (
    <>
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
                    onClick={(e) => {
                      e.stopPropagation()
                      onEdit(author)
                    }}
                  >
                    <Edit className="w-4 h-4 stroke-yellow-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      setDeleteAuthor(author)
                    }}
                  >
                    <Trash2 className="w-4 h-4 stroke-red-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={!!deleteAuthor} onOpenChange={(open) => !open && setDeleteAuthor(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cet auteur ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera définitivement l'auteur{' '}
              <span className="font-semibold">
                {deleteAuthor?.firstName} {deleteAuthor?.lastName}
              </span>{' '}
              et tous ses poèmes associés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteAuthor && handleDelete(deleteAuthor)}
              className="bg-red-500 hover:bg-red-600"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}