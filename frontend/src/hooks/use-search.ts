import { useQuery } from '@tanstack/react-query'

interface SearchResult {
  id: number
  type: 'poem' | 'author'
  title?: string
  content?: string
  firstName?: string
  lastName?: string
  date?: string
}

interface SearchParams {
  query: string
  type: 'all' | 'poems' | 'authors'
}

async function searchItems({
  query,
  type,
}: SearchParams): Promise<SearchResult[]> {
  if (!query) return []

  const response = await fetch(
    `http://localhost:8080/api/search?q=${encodeURIComponent(query)}&type=${type}`
  )
  if (!response.ok) throw new Error('Search failed')
  return response.json()
}

export function useSearch({ query, type }: SearchParams) {
  return useQuery({
    queryKey: ['search', { query, type }],
    queryFn: () => searchItems({ query, type }),
    enabled: query.length > 0,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  })
}
