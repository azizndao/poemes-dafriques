import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '../../ui/alert'

export function PoemsError() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Failed to load poems. Please try again later.
      </AlertDescription>
    </Alert>
  )
} 