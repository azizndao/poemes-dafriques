import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Book, Search, User } from 'lucide-react'
import { useState } from 'react'
import { AnimatedGradient } from '../../components/ui/animated-gradient'
import { Button } from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { request } from '../../lib/fetch'

interface Author {
  id: number
  firstName: string
  lastName: string
}

export const Route = createFileRoute('/authors/')({
  loader: () => fetchAuthors(),
  component: AuthorsPage,
})

async function fetchAuthors() {
  try {
    const response = await request('/authors')
    if (!response.ok) {
      throw new Error('Failed to fetch authors')
    }
    const data: Array<Author> = await response.json()
    return data
  } catch (err) {
    throw new Error('Failed to fetch authors')
  }
}

function AuthorsPage() {
  const authors = Route.useLoaderData()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAuthors = authors.filter((author) =>
    `${author.firstName} ${author.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            Auteurs Africains
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Découvrez les voix poétiques de l'Afrique
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto flex gap-2">
            <Input
              type="search"
              placeholder="Rechercher un auteur..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Authors Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuthors.map((author, index) => (
            <motion.div
              key={author.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <AnimatedGradient>
                <Card className="h-full border-0 backdrop-blur-lg bg-background/95">
                  <CardHeader className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-10 h-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-serif">
                      {author.firstName} {author.lastName}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-center">
                    <Link
                      to="/authors/$authorId"
                      params={{ authorId: author.id.toString() }}
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Book className="w-4 h-4" />
                      <span>Voir les poèmes</span>
                    </Link>
                  </CardContent>

                  <CardFooter className="justify-center border-t pt-4">
                    <p className="text-sm text-muted-foreground">
                      Auteur de poésie africaine
                    </p>
                  </CardFooter>
                </Card>
              </AnimatedGradient>
            </motion.div>
          ))}
        </div>

        {filteredAuthors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun auteur trouvé</p>
          </div>
        )}
      </div>
    </div>
  )
}
