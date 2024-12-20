import { useNavigate } from '@tanstack/react-router'
import { Edit, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { request } from '../../../lib/fetch'
import { formatDate } from '../../../lib/utils'
import type { Poem } from '../../../types/poem'
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
  const [deletePoem, setDeletePoem] = useState<Poem | null>(null)

  async function handleDelete(poem: Poem) {
    try {
      const response = await request(`/poems/${poem.id}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) throw new Error('Failed to delete poem')
      
      toast.success('Poem deleted successfully')
      navigate({ to: '/dashboard/poems' })
    } catch (error) {
      toast.error('Failed to delete poem')
    } finally {
      setDeletePoem(null)
    }
  }

  return (
    <>
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
                <TableCell className='text-center font-medium'>{index + 1}</TableCell>
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
                      onClick={(e) => {
                        e.stopPropagation()
                        onEdit(poem)
                      }}
                    >
                      <Edit className="w-4 h-4 stroke-yellow-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeletePoem(poem)
                      }}
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

      <AlertDialog open={!!deletePoem} onOpenChange={(open) => !open && setDeletePoem(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce poème ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action ne peut pas être annulée. Cela supprimera définitivement le poème{' '}
              <span className="font-semibold">
                {deletePoem?.title}
              </span>{' '}
              de{' '}
              <span className="font-semibold">
                {deletePoem?.author.firstName} {deletePoem?.author.lastName}
              </span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletePoem && handleDelete(deletePoem)}
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