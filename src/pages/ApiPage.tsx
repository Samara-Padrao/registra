import { useState } from "react";
import axios from "axios";
import { FiMapPin, FiSearch, FiLoader } from "react-icons/fi";
import { FaHouseFlag } from "react-icons/fa6";
import PageHeader from "../components/PageHeader";
import Modal from "../components/Modal";
import { safeLoad, saveJSON } from "../utils";
import type { Person } from "../types";
import { BsFillHouseXFill } from "react-icons/bs";

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

const INPUT_CLS =
  "bg-[var(--color-bg2)] border border-purple-900/40 text-[#e2d9f3] rounded-xl px-3.5 py-2.5 font-mono text-sm outline-none focus:border-purple-500/70 transition-colors placeholder:text-[var(--color-dim)]";

const applyCepMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5
    ? `${digits.slice(0, 5)}-${digits.slice(5)}`
    : digits;
};

const CepPage = () => {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<Address[]>([]);
  const [people, setPeople] = useState<Person[]>(() => safeLoad<Person[]>("pessoas", []));
  const [linkModalOpen, setLinkModalOpen] = useState(false);

  const persistPeople = (next: Person[]) => { saveJSON('pessoas', next); window.dispatchEvent(new CustomEvent('pessoas:updated')) }

  const fetchAddress = async () => {
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) {
      setError("CEP deve ter 8 dígitos");
      return;
    }

    setError("");
    setLoading(true);
    setAddress(null);
    try {
      const { data } = await axios.get<Address>(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      );
      if (data.erro) {
        setError("CEP não encontrado");
      } else {
        setAddress(data);
        setHistory((prev) =>
          [data, ...prev.filter((h) => h.cep !== data.cep)].slice(0, 5),
        );
      }
    } catch {
      setError("Erro ao conectar com a API");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") fetchAddress();
  };

  const selectFromHistory = (item: Address) => {
    setCep(item.cep);
    setAddress(item);
    setError("");
  };

  const addressRows = address
    ? [
        { label: "Logradouro", value: address.logradouro },
        { label: "Bairro", value: address.bairro },
        { label: "Cidade", value: address.localidade },
        { label: "Estado", value: address.uf },
      ]
    : [];

  return (
    <div>
      <PageHeader title="Busca de CEP" />

      <div className="grid grid-cols-[1fr_280px] gap-6">
        <div className="flex flex-col gap-4">
          <div className="bg-[var(--color-bg2)] border border-purple-900/30 rounded-2xl p-6">
            <div className="flex gap-3">
              <input
                value={cep}
                onChange={(e) => setCep(applyCepMask(e.target.value))}
                onKeyDown={handleKeyDown}
                placeholder="00000-000"
                maxLength={9}
                className={`flex-1 ${INPUT_CLS}`}
              />
              <button
                onClick={fetchAddress}
                disabled={loading}
                className="px-6 py-2.5 bg-[var(--color-purple)] hover:bg-purple-600 disabled:opacity-50 text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-colors"
              >
                {loading ? <FiLoader className="animate-spin" /> : <FiSearch />}
                Buscar
              </button>
            </div>

            {error && (
              <p className="font-mono text-xs text-[var(--color-red)] mt-3">
                {error}
              </p>
            )}
          </div>

          {address && (
            <div className="bg-[var(--color-bg2)] border border-purple-700/40 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-purple-900/40 border border-purple-700/30 flex items-center justify-center text-[var(--color-purple-light)]">
                  <FiMapPin />
                </div>
                <div>
                  <p className="font-black text-[var(--color-accent)] tracking-widest font-mono">
                    {address.cep}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-0">
                {addressRows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex justify-between py-3 ${i < addressRows.length - 1 ? "border-b border-purple-900/20" : ""}`}
                  >
                    <span className="font-mono text-xs text-[var(--color-muted)]">
                      {row.label}
                    </span>
                    <span className="font-bold text-sm text-[#e2d9f3]">
                      {row.value || "—"}
                    </span>
                  </div>
                ))}
                <div className="mt-4">
                  <button onClick={() => setLinkModalOpen(true)} className="px-4 py-2 bg-[var(--color-purple)] text-white rounded-xl font-bold">Vincular usuário</button>
                </div>
              </div>
            </div>
          )}

          {!address && !loading && !error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="p-4 rounded-md bg-[var(--color-bg2)] border text-[var(--color-accent)] border-purple-700/40">
                <FaHouseFlag className="text-4xl " />
              </div>
              <span className="font-mono text-sm text-[var(--color-dim)]">
                Digite um CEP para buscar o endereço
              </span>
            </div>
          )}
        </div>

        <div className="bg-[var(--color-bg2)] border border-purple-900/30 rounded-2xl p-5 h-fit">
          <p className="font-mono text-xs text-[var(--color-dim)] mb-4">
            Ultimas Buscas
          </p>

          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <div className="p-2 rounded-md bg-[var(--color-bg2)] border text-[var(--color-accent)] border-purple-700/40">
                <BsFillHouseXFill className="text-xl " />
              </div>

              <p className="font-mono text-xs text-[var(--color-dim)] text-center ">
                Nenhuma busca efetuada
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {history.map((item) => (
                <button
                  key={item.cep}
                  onClick={() => selectFromHistory(item)}
                  className="text-left p-3 bg-[var(--color-bg3)] border border-purple-900/20 hover:border-purple-700/40 rounded-xl transition-colors"
                >
                  <p className="font-mono text-xs font-bold text-[var(--color-accent)] mb-0.5">
                    {item.cep}
                  </p>
                  <p className="font-mono text-[10px] text-[var(--color-muted)] leading-relaxed truncate">
                    {item.localidade} · {item.uf}
                  </p>
                  <p className="font-mono text-[10px] text-[var(--color-dim)] truncate">
                    {item.bairro}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal open={linkModalOpen} title="Vincular endereço ao usuário" onClose={() => setLinkModalOpen(false)}>
        {people.length === 0 ? (
          <div className="font-mono text-[var(--color-dim)]">Nenhum usuário disponível</div>
        ) : (
          <div className="flex flex-col gap-2">
            {people.map(p => (
              <button key={p.id} onClick={() => {
                const next = people.map(x => x.id === p.id ? { ...x, address: address ?? undefined } : x)
                setPeople(next)
                persistPeople(next)
                setLinkModalOpen(false)
              }} className="text-left p-3 bg-[var(--color-bg3)] border border-purple-900/20 hover:border-purple-700/40 rounded-xl transition-colors">
                <p className="font-mono text-xs font-bold text-[var(--color-accent)] mb-0.5">{p.name}</p>
                <p className="font-mono text-[10px] text-[var(--color-muted)] leading-relaxed truncate">{p.email}</p>
              </button>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CepPage;
