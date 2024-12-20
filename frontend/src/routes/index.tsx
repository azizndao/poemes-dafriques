import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'
import HomeError from '../components/home/HomeError'
import HomePending from '../components/home/HomePending'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { PoemCard } from './authors/$authorId'

interface Poem {
  id: number
  title: string
  content: string
  date: string
  author: {
    id: number
    firstName: string
    lastName: string
  }
}

export const Route = createFileRoute('/')({
  loader:  () => fetchPoems(),
  component: HomeContent,
  errorComponent: () => <HomeError />,
  pendingComponent: () => <HomePending />,
})

async function fetchPoems() {
  try {
    const response = await fetch('http://localhost:8080/api/poems')
    if (!response.ok) {
      throw new Error('Failed to fetch poems')
    }
    const data: Array<Poem> = await response.json()
    return data
  } catch (err) {
    console.log(err);
    
    throw new Error('Failed to fetch poems')
  }
}

function HomeContent() {
  const poems = Route.useLoaderData()
  const [searchQuery, setSearchQuery] = useState('')
  
  const filteredPoems = poems.filter(poem => 
    poem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poem.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `${poem.author.firstName} ${poem.author.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
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
            Poèmes d'Afrique
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Découvrez la richesse de la poésie africaine
          </motion.p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto flex gap-2">
            <Input
              type="search"
              placeholder="Rechercher un poème ou un auteur..."
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

      {/* Poems Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPoems.map((poem, index) => (
           <PoemCard key={poem.id} poem={poem} index={index} />
          ))}
        </div>
        
        {filteredPoems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun poème trouvé</p>
          </div>
        )}
      </div>
    </div>
  )
}
