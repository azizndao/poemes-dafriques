import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from '../components/ui/sonner'
import './global.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60, // 1 hour
      retry: 1,
    },
  },
})

export const Route = createRootRoute({
  component: RootComponent
})

export default function RootComponent() {
  return (
    <QueryClientProvider client={queryClient} >
      <div className="min-h-screen bg-background text-foreground dark">
        <nav className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-foreground">Poèmes d'Afrique</h1>
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{
                    className: 'text-primary font-medium'
                  }}
                >
                  Accueil
                </Link>
                <Link
                  to="/authors"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{
                    className: 'text-primary font-medium'
                  }}
                >
                  Auteurs
                </Link>
              </div>
            </div>
            <Link
                  to="/dashboard/overview"
                  className="ml-auto text-muted-foreground hover:text-foreground transition-colors"
                  activeProps={{
                    className: 'text-primary font-medium'
                  }}
                >
                    Tableau de bord
                </Link>
          </div>
        </nav>
        
        <main className='container mx-auto'>
          <Outlet />
          <Toaster />
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </main>
        
        <footer className="border-t mt-12">
          <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
            &copy; 2024 Poèmes d'Afrique. Tous droits réservés.
          </div>
        </footer>
      </div>
    </QueryClientProvider>
  )
}
