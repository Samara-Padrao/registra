import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { safeLoad, saveJSON } from '../utils'
import type { Person } from '../types';
import PersonForm from '../components/PersonForm'

const KEY = 'pessoas'

const BackendPage = () => {
  const [people, setPeople] = useState<Person[]>(() => safeLoad<Person[]>(KEY, []))
  const [selected, setSelected] = useState<Person | null>(null)
  const [notice, setNotice] = useState('')
  const [noticeOk, setNoticeOk] = useState(false)

  const handleSubmit = (data: Omit<Person, 'id'> | (Partial<Person> & { id?: number })) => {
    const name = data.name ?? ''
    const email = data.email ?? ''
    if (!name || !email) { setNotice('Preencha os campos obrigatórios'); setNoticeOk(false); return }

    if ((data as Partial<Person>).id) {
      const next = people.map(p => p.id === (data as Partial<Person>).id ? { ...p, ...(data as Partial<Person>) } : p)
      setPeople(next); saveJSON(KEY, next)
      setSelected(null)
      setNotice('Pessoa atualizada!')
      setNoticeOk(true)
      setTimeout(() => { setNotice(''); setNoticeOk(false) }, 3000)
      return
    }

    const newPerson: Person = {
      id: Date.now(),
      name,
      email,
      age: Number((data as any).age) || 0,
      city: (data as any).city || '',
      cpf: (data as any).cpf,
      phone: (data as any).phone,
    }
    const next = [...people, newPerson]
    setPeople(next); saveJSON(KEY, next)
    setSelected(null)
    setNotice('Pessoa salva!')
    setNoticeOk(true)
    setTimeout(() => { setNotice(''); setNoticeOk(false) }, 3000)
  }

  const remove = (id: number) => { const next = people.filter(p => p.id !== id); setPeople(next); saveJSON(KEY, next) }

  useEffect(() => {
    const handler = () => setPeople(safeLoad<Person[]>(KEY, []))
    window.addEventListener('pessoas:updated', handler)
    return () => window.removeEventListener('pessoas:updated', handler)
  }, [])

  return (
    <div>
      <PageHeader title="Cadastro Back-end" />

      <div className="grid grid-cols-[_1.5fr_2fr] gap-6">
        <div className="bg-[var(--color-bg2)] border border-purple-900/30 rounded-2xl p-6">
          <p className="text-sm font-bold text-purple-400 mb-5">Cadastro Completo</p>
          <PersonForm initial={selected ?? undefined} onSubmit={handleSubmit} submitLabel="Salvar no banco" />
          {notice && (
            <p className={`mt-3 font-mono text-xs ${noticeOk ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'}`}>{notice}</p>
          )}
        </div>

        <div className="bg-[var(--color-bg2)] border border-purple-900/30 rounded-2xl p-6">
          <p className="font-mono text-xs font-bold text-purple-400 mb-5">
            <span className="text-[var(--color-dim)] font-normal">{people.length} registros</span>
          </p>

          {people.length === 0 ? (
            <div className="flex items-center justify-center h-48 font-mono text-sm text-[var(--color-dim)]">
              Nenhuma pessoa cadastrada ainda.
            </div>
          ) : (
            <div className="flex flex-col gap-2.5 max-h-96 overflow-y-auto pr-1">
              {people.map(p => (
                <div key={p.id} className="bg-[var(--color-bg3)] border border-purple-900/25 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-sm text-[#e2d9f3]">{p.name}</p>
                    <p className="font-mono text-[11px] text-[var(--color-muted)] mt-0.5">
                      {p.email} · {p.age} anos{p.city ? ` · ${p.city}` : ''}
                    </p>
                  </div>
                  <button onClick={() => remove(p.id)} className="px-3 py-1.5 bg-red-500/10 border border-red-500/25 text-[var(--color-red)] rounded-lg text-xs font-bold hover:bg-red-500/20 transition-colors">
                    Remover
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BackendPage