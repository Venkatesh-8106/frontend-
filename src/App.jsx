import { useState } from 'react'
import { LogOut, PanelTop, Sparkles } from 'lucide-react'
import { authService } from './services/AuthService'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserManagement from './components/UserManagement'
import { Button } from './components/ui'

function Brand() { return <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-white"><PanelTop size={19} /></div><div><p className="font-display text-lg font-extrabold leading-none text-ink">Campus<span className="text-coral">Pass</span></p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8aa09b]">Digital permissions</p></div></div> }

export default function App() {
  const session = authService.getSession()
  const [view, setView] = useState(session ? 'dashboard' : 'login')
  const [currentUser, setCurrentUser] = useState(session?.user || null)
  const [notice, setNotice] = useState(false)
  function handleLogin(nextSession) { setCurrentUser(nextSession.user); setView('dashboard') }
  function handleLogout() { authService.logout(); setCurrentUser(null); setView('login') }
  function handleRegistrationSuccess() { setNotice(true); setView('login') }

  if (view === 'dashboard') return <div className="min-h-screen bg-paper"><header className="border-b border-[#dce9e4] bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><Brand /><div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-bold text-ink">{currentUser?.name || 'Administrator'}</p><p className="text-xs text-[#8aa09b]">{currentUser?.role || 'Admin'} workspace</p></div><Button variant="ghost" size="icon" aria-label="Sign out" onClick={handleLogout}><LogOut size={18} /></Button></div></div></header><main className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14"><UserManagement currentUser={currentUser} /></main></div>

  return <div className="min-h-screen bg-paper"><header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"><Brand /><span className="hidden text-sm font-medium text-[#718783] sm:block">One place for every permission</span></header><main className="mx-auto flex max-w-7xl flex-col gap-10 px-5 pb-12 pt-6 lg:flex-row lg:items-center lg:gap-24 lg:px-8 lg:pb-20 lg:pt-14"><div className="max-w-xl flex-1"><div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#cbe2da] bg-white px-3 py-1.5 text-xs font-bold text-teal"><Sparkles size={14} />Campus operations, simplified</div><h2 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl">Permission flows that <span className="text-coral">move with you.</span></h2><p className="mt-6 max-w-lg text-base leading-7 text-[#718783] sm:text-lg">A calmer way to request, review, and approve campus access. Built for every role in your college community.</p><div className="mt-10 grid max-w-md grid-cols-3 gap-5 border-t border-[#dce9e4] pt-5"><div><p className="font-display text-2xl font-extrabold text-ink">24/7</p><p className="mt-1 text-xs text-[#8aa09b]">Access visibility</p></div><div><p className="font-display text-2xl font-extrabold text-ink">4.9<span className="text-coral">★</span></p><p className="mt-1 text-xs text-[#8aa09b]">Team satisfaction</p></div><div><p className="font-display text-2xl font-extrabold text-ink">1 hub</p><p className="mt-1 text-xs text-[#8aa09b]">For your campus</p></div></div></div><div className="flex w-full flex-1 justify-center">{view === 'register' ? <RegisterForm onBack={() => setView('login')} onSuccess={handleRegistrationSuccess} /> : <div className="w-full"><div className="mb-4 flex justify-end text-sm text-[#718783]">{notice ? <span className="font-semibold text-[#267151]">Account created. Sign in to continue.</span> : 'Secure access for your campus'}</div><LoginForm onLogin={handleLogin} onRegister={() => { setNotice(false); setView('register') }} /></div>}</div></main></div>
}
