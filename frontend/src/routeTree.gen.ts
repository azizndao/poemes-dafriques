/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as DashboardImport } from './routes/dashboard'
import { Route as AboutImport } from './routes/about'
import { Route as IndexImport } from './routes/index'
import { Route as AuthorsIndexImport } from './routes/authors/index'
import { Route as PoemsPoemIdImport } from './routes/poems/$poemId'
import { Route as DashboardPoemsImport } from './routes/dashboard.poems'
import { Route as DashboardOverviewImport } from './routes/dashboard.overview'
import { Route as DashboardAuthorsImport } from './routes/dashboard.authors'
import { Route as AuthorsAuthorIdImport } from './routes/authors/$authorId'

// Create/Update Routes

const DashboardRoute = DashboardImport.update({
  id: '/dashboard',
  path: '/dashboard',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  id: '/about',
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthorsIndexRoute = AuthorsIndexImport.update({
  id: '/authors/',
  path: '/authors/',
  getParentRoute: () => rootRoute,
} as any)

const PoemsPoemIdRoute = PoemsPoemIdImport.update({
  id: '/poems/$poemId',
  path: '/poems/$poemId',
  getParentRoute: () => rootRoute,
} as any)

const DashboardPoemsRoute = DashboardPoemsImport.update({
  id: '/poems',
  path: '/poems',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardOverviewRoute = DashboardOverviewImport.update({
  id: '/overview',
  path: '/overview',
  getParentRoute: () => DashboardRoute,
} as any)

const DashboardAuthorsRoute = DashboardAuthorsImport.update({
  id: '/authors',
  path: '/authors',
  getParentRoute: () => DashboardRoute,
} as any)

const AuthorsAuthorIdRoute = AuthorsAuthorIdImport.update({
  id: '/authors/$authorId',
  path: '/authors/$authorId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/dashboard': {
      id: '/dashboard'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardImport
      parentRoute: typeof rootRoute
    }
    '/authors/$authorId': {
      id: '/authors/$authorId'
      path: '/authors/$authorId'
      fullPath: '/authors/$authorId'
      preLoaderRoute: typeof AuthorsAuthorIdImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/authors': {
      id: '/dashboard/authors'
      path: '/authors'
      fullPath: '/dashboard/authors'
      preLoaderRoute: typeof DashboardAuthorsImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/overview': {
      id: '/dashboard/overview'
      path: '/overview'
      fullPath: '/dashboard/overview'
      preLoaderRoute: typeof DashboardOverviewImport
      parentRoute: typeof DashboardImport
    }
    '/dashboard/poems': {
      id: '/dashboard/poems'
      path: '/poems'
      fullPath: '/dashboard/poems'
      preLoaderRoute: typeof DashboardPoemsImport
      parentRoute: typeof DashboardImport
    }
    '/poems/$poemId': {
      id: '/poems/$poemId'
      path: '/poems/$poemId'
      fullPath: '/poems/$poemId'
      preLoaderRoute: typeof PoemsPoemIdImport
      parentRoute: typeof rootRoute
    }
    '/authors/': {
      id: '/authors/'
      path: '/authors'
      fullPath: '/authors'
      preLoaderRoute: typeof AuthorsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface DashboardRouteChildren {
  DashboardAuthorsRoute: typeof DashboardAuthorsRoute
  DashboardOverviewRoute: typeof DashboardOverviewRoute
  DashboardPoemsRoute: typeof DashboardPoemsRoute
}

const DashboardRouteChildren: DashboardRouteChildren = {
  DashboardAuthorsRoute: DashboardAuthorsRoute,
  DashboardOverviewRoute: DashboardOverviewRoute,
  DashboardPoemsRoute: DashboardPoemsRoute,
}

const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/authors/$authorId': typeof AuthorsAuthorIdRoute
  '/dashboard/authors': typeof DashboardAuthorsRoute
  '/dashboard/overview': typeof DashboardOverviewRoute
  '/dashboard/poems': typeof DashboardPoemsRoute
  '/poems/$poemId': typeof PoemsPoemIdRoute
  '/authors': typeof AuthorsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/authors/$authorId': typeof AuthorsAuthorIdRoute
  '/dashboard/authors': typeof DashboardAuthorsRoute
  '/dashboard/overview': typeof DashboardOverviewRoute
  '/dashboard/poems': typeof DashboardPoemsRoute
  '/poems/$poemId': typeof PoemsPoemIdRoute
  '/authors': typeof AuthorsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/about': typeof AboutRoute
  '/dashboard': typeof DashboardRouteWithChildren
  '/authors/$authorId': typeof AuthorsAuthorIdRoute
  '/dashboard/authors': typeof DashboardAuthorsRoute
  '/dashboard/overview': typeof DashboardOverviewRoute
  '/dashboard/poems': typeof DashboardPoemsRoute
  '/poems/$poemId': typeof PoemsPoemIdRoute
  '/authors/': typeof AuthorsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/about'
    | '/dashboard'
    | '/authors/$authorId'
    | '/dashboard/authors'
    | '/dashboard/overview'
    | '/dashboard/poems'
    | '/poems/$poemId'
    | '/authors'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/about'
    | '/dashboard'
    | '/authors/$authorId'
    | '/dashboard/authors'
    | '/dashboard/overview'
    | '/dashboard/poems'
    | '/poems/$poemId'
    | '/authors'
  id:
    | '__root__'
    | '/'
    | '/about'
    | '/dashboard'
    | '/authors/$authorId'
    | '/dashboard/authors'
    | '/dashboard/overview'
    | '/dashboard/poems'
    | '/poems/$poemId'
    | '/authors/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AboutRoute: typeof AboutRoute
  DashboardRoute: typeof DashboardRouteWithChildren
  AuthorsAuthorIdRoute: typeof AuthorsAuthorIdRoute
  PoemsPoemIdRoute: typeof PoemsPoemIdRoute
  AuthorsIndexRoute: typeof AuthorsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AboutRoute: AboutRoute,
  DashboardRoute: DashboardRouteWithChildren,
  AuthorsAuthorIdRoute: AuthorsAuthorIdRoute,
  PoemsPoemIdRoute: PoemsPoemIdRoute,
  AuthorsIndexRoute: AuthorsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/about",
        "/dashboard",
        "/authors/$authorId",
        "/poems/$poemId",
        "/authors/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/dashboard": {
      "filePath": "dashboard.tsx",
      "children": [
        "/dashboard/authors",
        "/dashboard/overview",
        "/dashboard/poems"
      ]
    },
    "/authors/$authorId": {
      "filePath": "authors/$authorId.tsx"
    },
    "/dashboard/authors": {
      "filePath": "dashboard.authors.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/overview": {
      "filePath": "dashboard.overview.tsx",
      "parent": "/dashboard"
    },
    "/dashboard/poems": {
      "filePath": "dashboard.poems.tsx",
      "parent": "/dashboard"
    },
    "/poems/$poemId": {
      "filePath": "poems/$poemId.tsx"
    },
    "/authors/": {
      "filePath": "authors/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
