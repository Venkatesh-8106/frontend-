import { BarChart3, ClipboardCheck, UsersRound } from 'lucide-react'
import TabItem from './TabItem'

export default function TabsContainer({ view, setView, isAdmin }) {
  const tabs = isAdmin
    ? [{ id: 'admin', label: 'Overview', icon: BarChart3 }]
    : [{ id: 'requests', label: 'My requests', icon: ClipboardCheck }, { id: 'admin', label: 'Overview', icon: BarChart3 }]

  return <nav className="flex w-full flex-col" aria-label="Workspace navigation"><div className="flex w-full flex-col items-start gap-2">{tabs.map((tab) => <TabItem key={tab.id} active={view === tab.id} icon={tab.icon} onClick={() => setView(tab.id)}>{tab.label}</TabItem>)}</div>{isAdmin && <div className="mt-8 border-t border-[#dce9e4] pt-4"><TabItem active={view === 'users'} icon={UsersRound} onClick={() => setView('users')}>User Management</TabItem></div>}</nav>
}
