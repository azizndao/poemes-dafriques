import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import type { Author } from '../../../types/author'
import { Button } from '../../ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form'
import { Input } from '../../ui/input'

const authorSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
})

interface EditAuthorDialogProps {
  author: Author | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditAuthorDialog({ author, open, onOpenChange }: EditAuthorDialogProps) {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof authorSchema>>({
    resolver: zodResolver(authorSchema),
    defaultValues: {
      firstName: author?.firstName || '',
      lastName: author?.lastName || '',
    },
  })

  useEffect(() => {
    if (author && open) {
      form.reset({
        firstName: author.firstName,
        lastName: author.lastName,
      })
    }
  }, [author, open])

  async function onSubmit(values: z.infer<typeof authorSchema>) {
    if (!author) return

    try {
      const response = await fetch(`http://localhost:8080/api/authors/${author.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) throw new Error('Failed to update author')

      toast.success('Author updated successfully')
      onOpenChange(false)
      navigate({ to: '/dashboard/authors' })
    } catch (error) {
      toast.error('Failed to update author')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Author</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Update Author
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 