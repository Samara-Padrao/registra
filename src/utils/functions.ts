export const applyMaskCPF = (value: string): string => {
  const d = value.replace(/\D/g, '').slice(0, 11)
  return d.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, a, b, c, dd) =>
    dd ? `${a}.${b}.${c}-${dd}` : c ? `${a}.${b}.${c}` : b ? `${a}.${b}` : a
  )
}

export const applyMaskPhone = (value: string): string => {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3')
  return d.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}

export const safeLoad = <T>(key: string, def: T): T => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return def
    return JSON.parse(raw) as T
  } catch {
    return def
  }
}

export const saveJSON = (key: string, data: unknown): void => {
  try { localStorage.setItem(key, JSON.stringify(data)) } catch {}
}


export const INPUT_CLS =
  "bg-[var(--color-bg2)] border border-purple-900/40 text-[#e2d9f3] rounded-xl px-3.5 py-2.5 font-mono text-sm outline-none focus:border-purple-500/70 transition-colors placeholder:text-[var(--color-dim)]";

export const applyCepMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5
    ? `${digits.slice(0, 5)}-${digits.slice(5)}`
    : digits;
};
