export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const inputCls =
  "w-full bg-[var(--color-bg)] border border-purple-900/40 text-[#e2d9f3] rounded-xl px-3.5 py-2.5 font-mono text-sm outline-none focus:border-purple-500/70 transition-colors placeholder:text-[var(--color-dim)]";
export const labelCls =
  "block font-mono text-[11px] text-[var(--color-muted)] mb-1.5 tracking-wide";
export const errorCls = "font-mono text-[11px] text-[var(--color-red)] mt-1";

export const crudSteps = [
  {
    letter: "C",
    title: "Criar",
    desc: "Criar e cadastrar novos registros no sistema",
    color: "#4ade80",
    ring: "border-green-500/30",
    bg: "bg-green-950/30",
  },
  {
    letter: "R",
    title: "Ler",
    desc: "Consultar e visualizar dados armazenados",
    color: "#38bdf8",
    ring: "border-sky-500/30",
    bg: "bg-sky-950/30",
  },
  {
    letter: "U",
    title: "Atualizar",
    desc: "Editar e atualizar informações existentes",
    color: "#facc15",
    ring: "border-yellow-500/30",
    bg: "bg-yellow-950/30",
  },
  {
    letter: "D",
    title: "Excluir",
    desc: "Remover registros que não são mais necessários",
    color: "#f87171",
    ring: "border-red-500/30",
    bg: "bg-red-950/30",
  },
];