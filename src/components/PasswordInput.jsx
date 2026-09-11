import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button, Input } from './ui'

export function PasswordInput({ id = 'password', value, onChange, placeholder = 'Enter your password', required = true }) {
  const [visible, setVisible] = useState(false)
  return <div className="relative"><Input id={id} name={id} type={visible ? 'text' : 'password'} value={value} onChange={onChange} placeholder={placeholder} required={required} className="pr-12" aria-label="Password" /><Button type="button" variant="ghost" size="icon" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible((current) => !current)} className="absolute right-0 top-0 text-[#718783]">{visible ? <EyeOff size={18} /> : <Eye size={18} />}</Button></div>
}
