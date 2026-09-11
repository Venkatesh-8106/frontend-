const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'
const TOKEN_KEY = 'campuspass_token'
const USER_KEY = 'campuspass_user'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, { headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, ...options })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.error || body.message || 'Something went wrong. Please try again.')
  return body
}

export const authService = {
  async login(credentials) {
    const body = await request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) })
    localStorage.setItem(TOKEN_KEY, body.token)
    localStorage.setItem(USER_KEY, JSON.stringify(body.user))
    return body
  },
  async register(details) {
    return request('/auth/register', { method: 'POST', body: JSON.stringify(details) })
  },
  async updateUser(id, details) {
    return request(`/admin/users/${id}`, { method: 'PUT', headers: { Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}` }, body: JSON.stringify(details) })
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
