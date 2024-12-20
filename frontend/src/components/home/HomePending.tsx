import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

export default function HomePending() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Generate 6 skeleton cards */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="space-y-2">
              {/* Title skeleton */}
              <Skeleton className="h-6 w-2/3" />
              {/* Author skeleton */}
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Content lines skeleton */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {/* Date skeleton */}
              <Skeleton className="h-4 w-24" />
              {/* Action button skeleton */}
              <Skeleton className="h-9 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
