import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import type { Author } from '../../../types/author'
import type { Poem } from '../../../types/poem'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Textarea } from '../../ui/textarea'

const poemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author_id: z.string().min(1, 'Author is required'),
  date: z.string().min(1, 'Date is required'),
})

interface EditPoemDialogProps {
  poem: Poem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditPoemDialog({ poem, open, onOpenChange }: EditPoemDialogProps) {
  const navigate = useNavigate()
  
  const form = useForm<z.infer<typeof poemSchema>>({
    resolver: zodResolver(poemSchema),
    defaultValues: {
      title: '',
      content: '',
      author_id: '',
      date: '',
    }
  })

  // Reset form with poem data when dialog opens
  useEffect(() => {
    if (poem && open) {
      form.reset({
        title: poem.title,
        content: poem.content,
        author_id: poem.author.id.toString(),
        date: poem.date.split('T')[0], // Format date for input
      })
    }
  }, [poem, open])

  const { data: authors } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/api/authors')
      if (!response.ok) throw new Error('Failed to fetch authors')
      return response.json()
    },
  })

  async function onSubmit(values: z.infer<typeof poemSchema>) {
    if (!poem) return

    try {
      const response = await fetch(`http://localhost:8080/api/poems/${poem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          author_id: parseInt(values.author_id),
        }),
      })

      if (!response.ok) throw new Error('Failed to update poem')

      toast.success('Poem updated successfully')
      onOpenChange(false)
      navigate({ to: '/dashboard/poems' })
    } catch (error) {
      toast.error('Failed to update poem')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Poem</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {authors?.map((author) => (
                        <SelectItem 
                          key={author.id} 
                          value={author.id.toString()}
                        >
                          {author.firstName} {author.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 