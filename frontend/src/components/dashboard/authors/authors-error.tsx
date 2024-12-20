import { AlertCircle } from 'lucide-react'
import { Card, CardContent } from '../../ui/card'

export function AuthorsError() {
  return (
    <Card className="bg-destructive/10">
      <CardContent className="flex items-center gap-2 p-4 text-destructive">
        <AlertCircle className="h-4 w-4" />
        <p>Erreur lors du chargement des auteurs</p>
      </CardContent>
    </Card>
  )
} 