import { demoApi } from './DemoApi'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const TOKEN_KEY = 'campuspass_token'
const USER_KEY = 'campuspass_user'
const USE_DEMO_FALLBACK = import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL

async function request(path, options = {}) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options })
  } catch {
    throw new Error('The API is unavailable. Start the backend or set VITE_API_BASE_URL in your environment.')
  }
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    const error = new Error(body.error || body.message || `Request failed with status ${response.status}.`)
    error.status = response.status
    throw error
  }
  return body
}

async function requestWithDemoFallback(path, options, demoRequest) {
  try {
    return await request(path, options)
  } catch (error) {
    if (USE_DEMO_FALLBACK && error.status === 404) return demoRequest()
    throw error
  }
}

export const authService = {
  async login(credentials) {
    const body = await requestWithDemoFallback('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }, () => demoApi.login(credentials))
    localStorage.setItem(TOKEN_KEY, body.token)
    localStorage.setItem(USER_KEY, JSON.stringify(body.user))
    return body
  },
  async register(details) {
    return requestWithDemoFallback('/auth/register', { method: 'POST', body: JSON.stringify(details) }, () => demoApi.register(details))
  },
  async updateUser(id, details) {
    return requestWithDemoFallback(`/admin/users/${id}`, { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` }, body: JSON.stringify(details) }, () => demoApi.updateUser(id, details))
  },
  getSession() {
    const user = localStorage.getItem(USER_KEY)
    return user ? { token: localStorage.getItem(TOKEN_KEY), user: JSON.parse(user) } : null
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}
