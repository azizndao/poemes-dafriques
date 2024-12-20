import { createFileRoute } from '@tanstack/react-router'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, Calendar, Heart, Share2, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { AnimatedGradient } from '../../components/ui/animated-gradient'
import { Button } from '../../components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { cn } from '../../lib/utils'

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

export const Route = createFileRoute('/poems/$poemId')({
  loader: async ({ params }) => fetchPoem(Number(params.poemId)),
  component: PoemPage,
  pendingComponent: PoemPageLoading,
  errorComponent: PoemPageError,
})

async function fetchPoem(id: number) {
  try {
    const response = await fetch(`http://localhost:8080/api/poems/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch poem')
    }
    const data: Poem = await response.json()
    return data
  } catch (err) {
    throw new Error('Failed to fetch poem')
  }
}

function PoemPage() {
  const poem = Route.useLoaderData()
  const [isLiked, setIsLiked] = useState(false)
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  const sharePoem = async () => {
    try {
      await navigator.share({
        title: poem.title,
        text: `${poem.title} par ${poem.author.firstName} ${poem.author.lastName}`,
        url: window.location.href,
      })
    } catch (err) {
      console.error('Error sharing:', err)
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-background to-muted"
      ref={containerRef}
    >
      {/* Hero Section */}
      <motion.div
        className="relative h-[70vh] flex items-center justify-center overflow-hidden"
        style={{ opacity, scale, y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/95 backdrop-blur-sm" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1
            className="text-6xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {poem.title}
          </motion.h1>

          <motion.div
            className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>
                {poem.author.firstName} {poem.author.lastName}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={poem.date}>
                {new Date(poem.date).toLocaleDateString()}
              </time>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto max-w-4xl px-4 -mt-20 relative z-20">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="hover:bg-background/80"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'hover:bg-background/80 transition-colors',
                isLiked && 'text-red-500 hover:text-red-600',
              )}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/80"
              onClick={sharePoem}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <AnimatedGradient>
            <Card className="overflow-hidden backdrop-blur-lg bg-background/95 border-0">
              <CardContent className="pt-8">
                <div className="prose prose-zinc dark:prose-invert max-w-none">
                  <motion.div
                    className="whitespace-pre-wrap font-serif text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    {poem.content.split('\n').map((line, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        className="mb-4 text-2xl"
                      >
                        {line}
                      </motion.p>
                    ))}
                  </motion.div>
                </div>
              </CardContent>

              <CardFooter className="border-t mt-8 pt-6">
                <p className="text-sm text-muted-foreground italic">
                  Publié le {new Date(poem.date).toLocaleDateString()}
                </p>
              </CardFooter>
            </Card>
          </AnimatedGradient>
        </motion.div>
      </div>
    </div>
  )
}

function PoemPageLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button variant="ghost" className="mb-8" disabled>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <Card>
          <CardHeader className="space-y-4 text-center pb-8 border-b">
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <div className="flex justify-center gap-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
            </div>
          </CardHeader>

          <CardContent className="pt-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function PoemPageError() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-2xl font-bold mb-4">Erreur</h1>
        <p className="text-muted-foreground mb-8">
          Impossible de charger le poème. Veuillez réessayer plus tard.
        </p>
        <Button onClick={() => window.history.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>
      </div>
    </div>
  )
}
