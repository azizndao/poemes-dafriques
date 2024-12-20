import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ArrowLeft, Book, User } from 'lucide-react'
import { useState } from 'react'
import { AnimatedGradient } from '../../components/ui/animated-gradient'
import { Button } from '../../components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { request } from '../../lib/fetch'

interface Author {
  id: number
  firstName: string
  lastName: string
}

interface Poem {
  id: number
  title: string
  content: string
  date: string
  author: Author
}

interface AuthorWithPoems {
  author: Author
  poems: Poem[]
}

export const Route = createFileRoute('/authors/$authorId')({
  loader: async ({ params }) => {
    try {
      const [authorRes, poemsRes] = await Promise.all([
        request(`/authors/${params.authorId}`),
        request(`/poems/author/${params.authorId}`)
      ])
      
      if (!authorRes.ok || !poemsRes.ok) {
        throw new Error('Failed to fetch author data')
      }
      
      const author: Author = await authorRes.json()
      const poems: Poem[] = await poemsRes.json()
      
      return { author, poems }
    } catch (err) {
      throw new Error('Failed to fetch author data')
    }
  },
  component: AuthorDetailPage,
})

function AuthorDetailPage() {
  const { author, poems } = Route.useLoaderData()
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredPoems = poems.filter(poem => 
    poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poem.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-16">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>

          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-serif font-bold mb-4 text-foreground"
            >
              {author.firstName} {author.lastName}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 text-muted-foreground mb-8"
            >
              <Book className="h-4 w-4" />
              <span>{poems.length} poèmes</span>
            </motion.div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <Input
                type="search"
                placeholder="Rechercher dans les poèmes..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Poems Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoems.map((poem, index) => (
            <PoemCard poem={poem} index={index} />
          ))}
        </div>
        
        {filteredPoems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {searchQuery ? "Aucun poème trouvé" : "Cet auteur n'a pas encore de poèmes"}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export function PoemCard({ poem, index }: { poem: Poem, index: number }) {
  return <motion.div
    key={poem.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    <AnimatedGradient>
      <Link
        to="/poems/$poemId"
        params={{ poemId: poem.id.toString() }}
        className="block h-full"
      >
        <Card className="h-full border-0 backdrop-blur-lg bg-background/95">
          <CardHeader>
            <CardTitle className="text-2xl font-serif">{poem.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground line-clamp-4 font-serif">
              {poem.content}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
            <time dateTime={poem.date}>
              {new Date(poem.date).toLocaleDateString()}
            </time>
          </CardFooter>
        </Card>
      </Link>
    </AnimatedGradient>
  </motion.div>
}

