import { useState } from 'react'
import { LogOut, PanelTop } from 'lucide-react'
import { authService } from './services/AuthService'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import UserManagement from './components/UserManagement'
import StudentRequests from './components/StudentRequests'
import AdminDashboard from './components/AdminDashboard'
import TabsContainer from './components/TabsContainer'
import { Button } from './components/ui'

function Brand() {
  return <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-white"><PanelTop size={19} /></div><div><p className="font-display text-lg font-extrabold leading-none text-ink">Campus<span className="text-coral">Pass</span></p><p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#8aa09b]">Digital permissions</p></div></div>
}

export default function App() {
  const session = authService.getSession()
  const [view, setView] = useState(session ? (['Admin', 'Administrator'].includes(session.user?.role) ? 'admin' : 'requests') : 'login')
  const [currentUser, setCurrentUser] = useState(session?.user || null)
  const [notice, setNotice] = useState(false)
  const isAdmin = ['Admin', 'Administrator'].includes(currentUser?.role)
  function handleLogin(nextSession) { setCurrentUser(nextSession.user); setView(['Admin', 'Administrator'].includes(nextSession.user?.role) ? 'admin' : 'requests') }
  function handleLogout() { authService.logout(); setCurrentUser(null); setView('login') }
  function handleRegistrationSuccess() { setNotice(true); setView('login') }

  if (['admin', 'users', 'requests'].includes(view)) return <div className="min-h-screen bg-paper"><header className="border-b border-[#dce9e4] bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8"><Brand /><div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-sm font-bold text-ink">{currentUser?.name || 'Administrator'}</p><p className="text-xs text-[#8aa09b]">{currentUser?.role || 'Admin'} workspace</p></div><Button variant="ghost" size="icon" aria-label="Sign out" onClick={handleLogout}><LogOut size={18} /></Button></div></div></header><div className="workspace-shell mx-auto flex max-w-7xl flex-col lg:flex-row lg:gap-8 lg:px-8"><aside className="workspace-sidebar w-full border-b border-[#dce9e4] bg-white py-3 lg:border-b-0 lg:border-r lg:bg-transparent lg:py-8"><TabsContainer view={view} setView={setView} isAdmin={isAdmin} /></aside><main className="min-w-0 flex-1 px-5 py-8 transition-opacity duration-200 lg:px-0 lg:py-14" key={view}>{view === 'users' ? <UserManagement currentUser={currentUser} /> : view === 'admin' ? <AdminDashboard /> : <StudentRequests />}</main></div></div>

  return <div className="min-h-screen bg-paper"><header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8"><Brand /><span className="hidden text-sm font-medium text-[#718783] sm:block">One place for every permission</span></header><main className="mx-auto flex max-w-7xl justify-center px-5 pb-12 pt-8 lg:px-8 lg:pb-20 lg:pt-14"><div className="flex w-full max-w-2xl justify-center">{view === 'register' ? <RegisterForm onBack={() => setView('login')} onSuccess={handleRegistrationSuccess} /> : <div className="w-full max-w-md"><div className="mb-4 flex justify-end text-sm text-[#718783]">{notice ? <span className="font-semibold text-[#267151]">Account created. Sign in to continue.</span> : 'Secure access for your campus'}</div><LoginForm onLogin={handleLogin} onRegister={() => { setNotice(false); setView('register') }} /></div>}</div></main></div>
}
