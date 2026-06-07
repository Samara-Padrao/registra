import React, { useState, useEffect } from 'react'
import { emailRe, inputCls, labelCls, errorCls } from '../utils/constants'
import { applyMaskCPF, applyMaskPhone } from '../utils/functions'
import type { Person } from '../types'

interface Props {
  initial?: Partial<Person>
  onSubmit: (data: Omit<Person, 'id'> | (Partial<Person> & { id?: number })) => void
  submitLabel?: string
}

const PersonForm = ({ initial, onSubmit, submitLabel = 'Salvar' }: Props) => {
  const [form, setForm] = useState({ name: '', email: '', cpf: '', phone: '', city: '', age: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (initial) setForm(f => ({ ...f, name: initial.name || '', email: initial.email || '', cpf: initial.cpf || '', phone: initial.phone || '', city: initial.city || '', age: initial.age ? String(initial.age) : '' }))
  }, [initial])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Nome é obrigatório'
    if (!emailRe.test(form.email)) e.email = 'E-mail inválido'
    if (form.cpf.replace(/\D/g, '').length !== 11) e.cpf = 'CPF deve ter 11 dígitos'
    return e
  }

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    onSubmit({ name: form.name, email: form.email, cpf: form.cpf, phone: form.phone, city: form.city, age: Number(form.age) || 0 })
  }

  const setField = (k: string) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: ev.target.value }))

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className={labelCls}>Nome *</label>
        <input className={inputCls} value={form.name} onChange={setField('name')} placeholder="Nome completo" />
        {errors.name && <p className={errorCls}>{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className={labelCls}>E-mail *</label>
        <input className={inputCls} value={form.email} onChange={setField('email')} placeholder="email@empresa.com" />
        {errors.email && <p className={errorCls}>{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label className={labelCls}>CPF *</label>
        <input className={inputCls} value={form.cpf} onChange={e => setForm(f => ({ ...f, cpf: applyMaskCPF(e.target.value) }))} placeholder="000.000.000-00" maxLength={14} />
        {errors.cpf && <p className={errorCls}>{errors.cpf}</p>}
      </div>

      <div className="mb-4">
        <label className={labelCls}>Telefone</label>
        <input className={inputCls} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: applyMaskPhone(e.target.value) }))} placeholder="(11) 99999-9999" />
      </div>

      <button type="submit" className="w-full py-3 bg-[var(--color-purple)] hover:bg-purple-600 text-white rounded-xl font-black text-sm transition-colors">
        {submitLabel}
      </button>
    </form>
  )
}

export default PersonForm
