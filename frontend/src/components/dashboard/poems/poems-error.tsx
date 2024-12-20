import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert'

export function PoemsError() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erreur</AlertTitle>
      <AlertDescription>
        Echec de chargement des poèmes. Veuillez réessayer plus tard.
      </AlertDescription>
    </Alert>
  )
} 