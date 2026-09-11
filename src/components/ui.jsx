import { useEffect } from 'react'

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Button({ className, variant = 'primary', size = 'default', type = 'button', ...props }) {
  const variants = {
    primary: 'bg-teal text-white hover:bg-[#0a403d] shadow-sm',
    outline: 'border border-[#c8d9d4] bg-white text-ink hover:bg-mint/40',
    ghost: 'text-[#58706c] hover:bg-mint/60 hover:text-teal',
  }
  const sizes = { default: 'h-11 px-4', sm: 'h-9 px-3 text-sm', icon: 'h-10 w-10 p-0' }
  return <button type={type} className={cn('inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50', variants[variant], sizes[size], className)} {...props} />
}

export function Input({ className, ...props }) {
  return <input className={cn('flex h-11 w-full rounded-xl border border-[#cfdfda] bg-white px-3.5 text-sm text-ink outline-none transition placeholder:text-[#9aacaa] focus:border-teal focus:ring-4 focus:ring-teal/10 disabled:cursor-not-allowed disabled:opacity-60', className)} {...props} />
}

export function Label({ className, ...props }) {
  return <label className={cn('mb-1.5 block text-sm font-semibold text-ink', className)} {...props} />
}

export function Card({ className, ...props }) {
  return <section className={cn('rounded-2xl border border-[#dce9e4] bg-white shadow-soft', className)} {...props} />
}

export function Alert({ variant = 'error', className, children }) {
  return <div role="alert" className={cn('rounded-xl border px-3.5 py-3 text-sm', variant === 'success' ? 'border-[#b7ddcd] bg-[#f0faf5] text-[#21634b]' : 'border-[#f3c9c2] bg-[#fff5f2] text-[#a64a3b]', className)}>{children}</div>
}

export function Badge({ children, tone = 'active' }) {
  const tones = { active: 'bg-[#e4f5ec] text-[#267151]', pending: 'bg-[#fff1d7] text-[#9b6914]', admin: 'bg-[#e4edff] text-[#3a61a5]' }
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold', tones[tone] || tones.active)}>{children}</span>
}

export function Dialog({ open, onOpenChange, title, description, children }) {
  useEffect(() => {
    const handler = (event) => event.key === 'Escape' && onOpenChange(false)
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onOpenChange])
  if (!open) return null
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#102f2c]/35 p-4 backdrop-blur-sm sm:items-center" onMouseDown={(event) => event.target === event.currentTarget && onOpenChange(false)}><div role="dialog" aria-modal="true" aria-labelledby="dialog-title" className="w-full max-w-md rounded-2xl border border-[#dce9e4] bg-white p-6 shadow-2xl"><div className="mb-6"><h2 id="dialog-title" className="font-display text-xl font-extrabold text-ink">{title}</h2>{description && <p className="mt-1 text-sm text-[#718783]">{description}</p>}</div>{children}</div></div>
}
