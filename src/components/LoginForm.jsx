import { useState } from 'react'
import { ArrowRight, LockKeyhole, Mail } from 'lucide-react'
import { authService } from '../services/AuthService'
import { Alert, Button, Card, Input, Label } from './ui'
import { PasswordInput } from './PasswordInput'

export default function LoginForm({ onLogin, onRegister }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Student')
  const [facultyId, setFacultyId] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid college email address.')
    if (!password) return setError('Enter your password to continue.')
    if (role === 'Faculty' && !facultyId.trim()) return setError('Enter your Faculty ID to continue.')
    setLoading(true)
    try { const session = await authService.login({ email: email.trim(), password, role, ...(role === 'Faculty' ? { facultyId: facultyId.trim() } : {}) }); onLogin(session) } catch (requestError) { setError(requestError.message) } finally { setLoading(false) }
  }

  return <Card className="w-full max-w-md p-6 sm:p-8"><div className="mb-8"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-coral text-white"><LockKeyhole size={21} /></div><h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">Welcome back</h1><p className="mt-2 text-sm leading-6 text-[#718783]">Sign in to manage digital permissions across your campus.</p></div><form onSubmit={handleSubmit} className="space-y-5">{error && <Alert>{error}</Alert>}<div><Label htmlFor="email">Email address</Label><div className="relative"><Mail size={17} className="absolute left-3.5 top-3.5 text-[#94aaa5]" /><Input id="email" type="email" autoComplete="email" placeholder="you@college.edu" value={email} onChange={(event) => setEmail(event.target.value)} className="pl-10" aria-label="Email address" /></div></div><div><Label htmlFor="login-role">Role</Label><select id="login-role" value={role} onChange={(event) => { setRole(event.target.value); if (event.target.value !== 'Faculty') setFacultyId('') }} className="h-11 w-full rounded-xl border border-[#cfdfda] bg-white px-3.5 text-sm text-ink outline-none focus:border-teal focus:ring-4 focus:ring-teal/10" aria-label="Role"><option>Student</option><option>Faculty</option><option>Security</option><option>Admin</option></select></div>{role === 'Faculty' && <div><Label htmlFor="faculty-id">Faculty ID</Label><Input id="faculty-id" name="facultyId" placeholder="e.g. FAC-1024" value={facultyId} onChange={(event) => setFacultyId(event.target.value)} autoComplete="username" required aria-label="Faculty ID" /></div>}<div><Label htmlFor="password">Password</Label><PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} /></div><Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'}<ArrowRight size={17} /></Button></form><p className="mt-7 text-center text-sm text-[#718783]">New to CampusPass? <button type="button" onClick={onRegister} className="font-bold text-teal hover:underline">Create an account</button></p></Card>
}
