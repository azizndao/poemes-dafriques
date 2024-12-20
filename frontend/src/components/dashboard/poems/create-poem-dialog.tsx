import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Textarea } from '../../ui/textarea'

const poemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  authorId: z.string().min(1, 'Author is required'),
  date: z.string().min(1, 'Date is required'),
})

interface CreatePoemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreatePoemDialog({ open, onOpenChange }: CreatePoemDialogProps) {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof poemSchema>>({
    resolver: zodResolver(poemSchema),
    defaultValues: {
      title: '',
      content: '',
      authorId: '',
      date: new Date().toISOString().split('T')[0],
    },
  })

  const { data: authors } = useQuery<Author[]>({
    queryKey: ['authors'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8080/api/authors')
      if (!response.ok) throw new Error('Failed to fetch authors')
      return response.json()
    },
  })

  async function onSubmit(values: z.infer<typeof poemSchema>) {
    try {
      const response = await fetch('http://localhost:8080/api/poems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          authorId: parseInt(values.authorId),
        }),
      })

      if (!response.ok) throw new Error('Failed to create poem')

      toast.success('Poem created successfully')
      onOpenChange(false)
      form.reset()
      navigate({ to: '/dashboard/poems' })
    } catch (error) {
      toast.error('Failed to create poem')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Poem</DialogTitle>
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
              name="authorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an author" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {authors?.map((author) => (
                        <SelectItem key={author.id} value={author.id.toString()}>
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

            <Button type="submit" className="w-full">
              Create Poem
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
} 