import { cn } from './ui'

export default function TabItem({ active, icon: Icon, children, onClick }) {
  return <button type="button" aria-current={active ? 'page' : undefined} onClick={onClick} style={{ height: '46px' }} className={cn('flex w-full items-center justify-start gap-x-2 rounded-lg px-5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/40', active ? 'bg-teal text-white font-bold shadow-sm' : 'text-[#687c78] hover:bg-teal/5 hover:text-teal')}>{Icon && <Icon size={16} strokeWidth={active ? 2.4 : 2} />}{children}</button>
}
