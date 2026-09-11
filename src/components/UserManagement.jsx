import { useState } from 'react'
import { Edit3, Search, ShieldCheck, UsersRound } from 'lucide-react'
import { authService } from '../services/AuthService'
import { Alert, Badge, Button, Dialog, Input, Label } from './ui'

const starterUsers = [
  { id: 'usr-101', name: 'Aarav Sharma', email: 'aarav.sharma@northbridge.edu', phone: '+91 98765 12043', role: 'Student', status: 'Active' },
  { id: 'usr-102', name: 'Dr. Meera Iyer', email: 'meera.iyer@northbridge.edu', phone: '+91 98765 77311', role: 'Faculty', status: 'Active' },
  { id: 'usr-103', name: 'Kabir Nair', email: 'kabir.nair@northbridge.edu', phone: '+91 98765 44820', role: 'Student', status: 'Pending' },
  { id: 'usr-104', name: 'Priya Menon', email: 'priya.menon@northbridge.edu', phone: '+91 98765 33218', role: 'Security', status: 'Active' },
]

export default function UserManagement() {
  const [users, setUsers] = useState(starterUsers)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ email: '', phone: '' })
  const [feedback, setFeedback] = useState(null)
  const [saving, setSaving] = useState(false)
  const visibleUsers = users.filter((user) => `${user.id} ${user.name} ${user.email} ${user.role}`.toLowerCase().includes(query.toLowerCase()))

  function openEdit(user) {
    setSelected(user)
    setForm({ email: user.email, phone: user.phone })
    setFeedback(null)
  }

  async function saveEdit(event) {
    event.preventDefault()
    setFeedback(null)
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setFeedback({ type: 'error', text: 'Enter a valid email address.' })
    if (!form.phone.trim()) return setFeedback({ type: 'error', text: 'Phone number cannot be empty.' })
    setSaving(true)
    try {
      await authService.updateUser(selected.id, form)
      setUsers((current) => current.map((user) => user.id === selected.id ? { ...user, ...form } : user))
      setSelected(null)
      setFeedback({ type: 'success', text: 'User details updated successfully.' })
    } catch (requestError) {
      setFeedback({ type: 'error', text: requestError.message })
    } finally {
      setSaving(false)
    }
  }

  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><p className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-coral"><ShieldCheck size={16} />Administration</p><h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">User management</h1><p className="mt-2 text-[#718783]">Keep campus identities and contact details up to date.</p></div>
      <div className="flex items-center gap-3 rounded-xl border border-[#dce9e4] bg-white px-4 py-3"><UsersRound size={20} className="text-teal" /><div><p className="text-xs font-semibold uppercase tracking-wider text-[#8aa09b]">Total users</p><p className="font-display text-xl font-extrabold text-ink">{users.length}</p></div></div>
    </div>
    {feedback && <Alert variant={feedback.type === 'success' ? 'success' : 'error'}>{feedback.text}</Alert>}
    <div className="overflow-hidden rounded-2xl border border-[#dce9e4] bg-white shadow-soft">
      <div className="flex flex-col gap-3 border-b border-[#e7f0ed] p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-display text-lg font-extrabold text-ink">Campus directory</h2><p className="text-sm text-[#8aa09b]">{visibleUsers.length} people in your view</p></div><div className="relative w-full sm:w-72"><Search size={17} className="absolute left-3.5 top-3.5 text-[#9aacaa]" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search users..." className="pl-10" aria-label="Search users" /></div></div>
      <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left"><thead className="bg-[#f6faf8] text-xs uppercase tracking-wider text-[#829793]"><tr><th className="px-5 py-3.5 font-bold">User ID</th><th className="px-5 py-3.5 font-bold">Name</th><th className="px-5 py-3.5 font-bold">Email</th><th className="px-5 py-3.5 font-bold">Phone number</th><th className="px-5 py-3.5 font-bold">Role</th><th className="px-5 py-3.5 font-bold">Status</th><th className="px-5 py-3.5" /></tr></thead><tbody className="divide-y divide-[#edf3f0]">{visibleUsers.map((user) => <tr key={user.id} className="transition hover:bg-[#fbfdfc]"><td className="px-5 py-4 text-xs font-semibold text-[#8a9c98]">{user.id}</td><td className="px-5 py-4 font-semibold text-ink">{user.name}</td><td className="px-5 py-4 text-sm text-[#58706c]">{user.email}</td><td className="px-5 py-4 text-sm text-[#58706c]">{user.phone}</td><td className="px-5 py-4"><Badge tone={user.role === 'Admin' ? 'admin' : 'active'}>{user.role}</Badge></td><td className="px-5 py-4"><Badge tone={user.status === 'Pending' ? 'pending' : 'active'}>{user.status}</Badge></td><td className="px-5 py-4 text-right"><Button variant="outline" size="sm" onClick={() => openEdit(user)}><Edit3 size={15} />Edit</Button></td></tr>)}</tbody></table></div>
    </div>
    <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} title="Edit user details" description={selected ? `Update contact details for ${selected.name}.` : ''}><form onSubmit={saveEdit} className="space-y-5">{feedback?.type === 'error' && <Alert>{feedback.text}</Alert>}<div><Label htmlFor="edit-email">Email address</Label><Input id="edit-email" type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} aria-label="Edit email address" /></div><div><Label htmlFor="edit-phone">Phone number</Label><Input id="edit-phone" type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} aria-label="Edit phone number" /></div><div className="flex justify-end gap-3 pt-2"><Button type="button" variant="ghost" onClick={() => setSelected(null)}>Cancel</Button><Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save changes'}</Button></div></form></Dialog>
  </div>
}
