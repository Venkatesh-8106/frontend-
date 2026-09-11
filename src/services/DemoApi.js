const DEMO_USERS_KEY = 'campuspass_demo_users'

const defaultUsers = [
  { id: 'usr-101', name: 'Aarav Sharma', email: 'aarav.sharma@northbridge.edu', role: 'Student' },
  { id: 'usr-102', name: 'Dr. Meera Iyer', email: 'meera.iyer@northbridge.edu', role: 'Faculty' },
]

function getUsers() {
  const stored = localStorage.getItem(DEMO_USERS_KEY)
  return stored ? JSON.parse(stored) : defaultUsers
}

function saveUsers(users) {
  localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users))
}

export const demoApi = {
  register(details) {
    const users = getUsers()
    if (users.some((user) => user.email.toLowerCase() === details.email.toLowerCase())) throw new Error('An account with this email already exists.')
    const user = { id: `usr-${Date.now()}`, name: details.name, email: details.email, role: details.role }
    saveUsers([...users, user])
    return { success: true, data: { user } }
  },
  login(credentials) {
    const user = getUsers().find((item) => item.email.toLowerCase() === credentials.email.toLowerCase()) || { id: 'usr-demo', name: 'Demo Administrator', email: credentials.email, role: 'Admin' }
    return { token: 'demo-token', user }
  },
  updateUser(id, details) {
    const users = getUsers().map((user) => user.id === id ? { ...user, ...details } : user)
    saveUsers(users)
    return { success: true, data: { user: users.find((user) => user.id === id) } }
  },
}
