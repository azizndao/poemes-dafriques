import { Card, CardContent, CardHeader } from '../../ui/card'
import { Skeleton } from '../../ui/skeleton'

export function AuthorsLoading() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <Skeleton className="h-8 w-[100px]" />
        <Skeleton className="h-10 w-[120px]" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
} 