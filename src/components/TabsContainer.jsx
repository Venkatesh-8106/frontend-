import { BarChart3, ClipboardCheck } from 'lucide-react'
import TabItem from './TabItem'

export default function TabsContainer({ view, setView, isAdmin }) {
  const tabs = isAdmin
    ? [{ id: 'admin', label: 'Overview', icon: BarChart3 }]
    : [{ id: 'requests', label: 'My requests', icon: ClipboardCheck }, { id: 'admin', label: 'Overview', icon: BarChart3 }]

  return <nav className="flex w-full flex-col items-start gap-2" aria-label="Workspace navigation">{tabs.map((tab) => <TabItem key={tab.id} active={view === tab.id} icon={tab.icon} onClick={() => setView(tab.id)}>{tab.label}</TabItem>)}</nav>
}
