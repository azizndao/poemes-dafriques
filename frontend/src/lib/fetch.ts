const API_URL = 'http://localhost:8080/api'

export function request(url: string, options?: RequestInit) {
  return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      'Content-Type': 'application/json',
    },
  })
}
