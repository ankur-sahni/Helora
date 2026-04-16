# Skill: Frontend Patterns

Established patterns for frontend development. Follow these consistently.

---

## Component Structure

```
components/
├── [ComponentName]/
│   ├── index.ts          # re-export only
│   ├── ComponentName.tsx # component logic
│   ├── ComponentName.test.tsx
│   └── ComponentName.module.css (if needed)
```

## Component Rules

- One component per file
- Props interface defined and exported above component
- Default export for the component, named exports for types
- No business logic in components — call hooks, not services directly
- No direct API calls in components — goes through hooks

## Hook Pattern

```typescript
// Data fetching hook
export function useUser(userId: string) {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => api.users.get(userId),
    staleTime: 5 * 60 * 1000,
  })
}

// Mutation hook
export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: UpdateUserInput) => api.users.update(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] })
    },
  })
}
```

## State Management Rules

- **Server state**: React Query / TanStack Query (not in Zustand)
- **UI state**: Local `useState` first — lift to Zustand only when shared across 2+ routes
- **Form state**: React Hook Form
- **URL state**: Router search params (not Zustand)

## Error Handling

```typescript
// Route-level error boundary (not per-component)
// Error boundaries catch render errors — async errors handled in hooks

// API error pattern
const { data, error, isLoading } = useUser(id)
if (isLoading) return <Skeleton />
if (error) return <ErrorState error={error} />
return <UserCard user={data} />
```

## Performance

- Lazy load routes: `const Page = lazy(() => import('./pages/Page'))`
- Memoize expensive computations: `useMemo` — not as default, only when profiling shows need
- Avoid re-renders: `useCallback` for handlers passed to memoized children only
- Images: always specify `width` and `height` to prevent layout shift

## Accessibility

- All interactive elements reachable by keyboard
- All images have `alt` text (empty string `""` for decorative)
- Form inputs always have associated `<label>`
- Color is never the only way information is conveyed
