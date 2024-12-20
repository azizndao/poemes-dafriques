import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs'

const tabs = [
  { label: 'Aperçu', path: '/dashboard' },
  { label: 'Auteurs', path: '/dashboard/authors' },
  { label: 'Poèmes', path: '/dashboard/poems' },
]

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="container py-6 space-y-6">
      <Tabs defaultValue="/dashboard" className="w-full">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.path} value={tab.path} asChild>
              <Link
                to={tab.path}
                activeProps={{
                  className: 'bg-background shadow-sm',
                }}
                activeOptions={{
                  exact: true,
                }}
              >
                {tab.label}
              </Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="p-4 border rounded-lg bg-card">
        <Outlet />
      </div>
    </div>
  )
}
