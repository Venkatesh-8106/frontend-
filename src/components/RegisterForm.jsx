import { useState } from 'react'
import { ArrowLeft, ArrowRight, UserRound } from 'lucide-react'
import { authService } from '../services/AuthService'
import { Alert, Button, Card, Input, Label } from './ui'
import { PasswordInput } from './PasswordInput'

const initialForm = { name: '', email: '', password: '', role: 'Student', facultyId: '', college: '', department: '', section: '' }

export default function RegisterForm({ onBack, onSuccess }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

  async function handleSubmit(event) {
    event.preventDefault(); setError('')
    if (!form.name.trim() || !form.email.trim() || !form.password || !form.college.trim() || !form.department.trim()) return setError('Complete all required fields before creating your account.')
    if (form.role === 'Faculty' && !form.facultyId.trim()) return setError('Enter your Faculty ID before creating your account.')
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email address.')
    if (form.password.length < 8) return setError('Password must be at least 8 characters.')
    setLoading(true)
    try { await authService.register({ ...form, name: form.name.trim(), email: form.email.trim() }); onSuccess() } catch (requestError) { setError(requestError.message) } finally { setLoading(false) }
  }

  return <Card className="w-full max-w-2xl p-6 sm:p-8"><div className="mb-7 flex items-start gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-coral text-white"><UserRound size={21} /></div><div><h1 className="font-display text-3xl font-extrabold tracking-tight text-ink">Create your account</h1><p className="mt-2 text-sm text-[#718783]">Join the campus permission network in a few steps.</p></div></div><form onSubmit={handleSubmit} className="space-y-5">{error && <Alert>{error}</Alert>}<div className="grid gap-5 sm:grid-cols-2"><div><Label htmlFor="name">Full name</Label><Input id="name" placeholder="Aarav Sharma" value={form.name} onChange={update('name')} aria-label="Full name" /></div><div><Label htmlFor="register-email">Email address</Label><Input id="register-email" type="email" placeholder="you@college.edu" value={form.email} onChange={update('email')} aria-label="Email address" /></div><div><Label htmlFor="register-password">Password</Label><PasswordInput id="register-password" value={form.password} onChange={update('password')} placeholder="At least 8 characters" /></div><div><Label htmlFor="role">Role</Label><select id="role" value={form.role} onChange={update('role')} className="h-11 w-full rounded-xl border border-[#cfdfda] bg-white px-3.5 text-sm text-ink outline-none focus:border-teal focus:ring-4 focus:ring-teal/10" aria-label="Role"><option>Student</option><option>Faculty</option><option>Security</option><option>Admin</option></select></div>{form.role === 'Faculty' && <div><Label htmlFor="faculty-id">Faculty ID</Label><Input id="faculty-id" name="facultyId" placeholder="e.g. FAC-1024" value={form.facultyId} onChange={update('facultyId')} required aria-label="Faculty ID" /></div>}<div><Label htmlFor="college">College</Label><Input id="college" placeholder="Northbridge College" value={form.college} onChange={update('college')} aria-label="College" /></div><div><Label htmlFor="department">Department</Label><Input id="department" placeholder="Computer Science" value={form.department} onChange={update('department')} aria-label="Department" /></div><div className="sm:col-span-2"><Label htmlFor="section">Section <span className="font-normal text-[#9aacaa]">(optional)</span></Label><Input id="section" placeholder="e.g. CSE-B" value={form.section} onChange={update('section')} aria-label="Section" /></div></div><div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between"><Button type="button" variant="ghost" onClick={onBack}><ArrowLeft size={16} />Back to sign in</Button><Button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Create account'}<ArrowRight size={17} /></Button></div></form></Card>
}
