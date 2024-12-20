import { AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "../ui/card"

interface HomeErrorProps {
  message?: string
}

export default function HomeError({ message = "Failed to load poems" }: HomeErrorProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-lg">
        <CardHeader className="flex flex-row items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Error</h2>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{message}</p>
        </CardContent>
      </Card>
    </div>
  )
} 