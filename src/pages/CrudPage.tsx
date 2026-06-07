import React, { useState } from "react";
import PageHeader from "../components/PageHeader";
import PersonForm from "../components/PersonForm";
import Modal from "../components/Modal";
import { safeLoad, saveJSON } from "../utils";
import type { Person } from "../types";

const KEY = "pessoas";

const CrudPage = () => {
  const [people, setPeople] = useState<Person[]>(() =>
    safeLoad<Person[]>(KEY, []),
  );
  const [selectedForForm, setSelectedForForm] = useState<Person | null>(null);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPerson, setModalPerson] = useState<Person | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "delete">(
    "view",
  );

  const updateStorage = (next: Person[]) => {
    setPeople(next);
    saveJSON(KEY, next);
  };

  React.useEffect(() => {
    const handler = () => setPeople(safeLoad<Person[]>(KEY, []));
    window.addEventListener("pessoas:updated", handler);
    return () => window.removeEventListener("pessoas:updated", handler);
  }, []);

  const handleSubmit = (
    data: Omit<Person, "id"> | (Partial<Person> & { id?: number }),
  ) => {
    if ((data as any).id) {
      const next = people.map((p) =>
        p.id === (data as any).id ? { ...(p as any), ...(data as any) } : p,
      );
      updateStorage(next);
      setSelectedForForm(null);
      return;
    }
    const next = [...people, { id: Date.now(), ...(data as any) }];
    updateStorage(next);
    setSelectedForForm(null);
  };

  const remove = (id: number) => {
    updateStorage(people.filter((p) => p.id !== id));
    setModalOpen(false);
  };

  const filtered = people.filter((p) =>
    [p.name, p.email, String(p.age), p.city || ""].some((v) =>
      v.toLowerCase().includes(search.toLowerCase()),
    ),
  );

  return (
    <div>
      <PageHeader title="CRUD" />

      <div className="grid grid-cols-[_1.5fr_2fr] gap-5">
        <div className="bg-[var(--color-bg2)] border border-purple-900/30 rounded-2xl p-5">
          <PersonForm
            initial={selectedForForm ?? undefined}
            onSubmit={(d) => handleSubmit(d as any)}
            submitLabel={selectedForForm ? "Salvar alterações" : "+ Criar registro"}
          />

          {selectedForForm && (
            <div className="mt-3 flex gap-2">
                <button
                onClick={() => setSelectedForForm(null)}
                className="px-3 py-2 bg-[var(--color-bg3)] border border-purple-900/30 rounded-xl"
              >
                Cancelar edição
              </button>
            </div>
          )}
        </div>

        <div className="bg-[var(--color-bg2)] border border-purple-900/30 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-xs font-bold text-sky-400">
                <span className="font-normal text-[var(--color-dim)]">
                {filtered.length} registros
              </span>
            </p>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="w-44 bg-[var(--color-bg)] border border-purple-900/40 text-[#e2d9f3] rounded-xl px-3 py-2 font-mono text-xs outline-none focus:border-purple-500/70 placeholder:text-[var(--color-dim)] transition-colors"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="flex items-center justify-center h-48 font-mono text-sm text-[var(--color-dim)]">
              Nenhum registro encontrado
            </div>
          ) : (
            <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-1">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setModalPerson(p);
                    setModalMode("view");
                    setModalOpen(true);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all bg-[var(--color-bg3)] border-purple-900/20 hover:border-purple-800/30`}
                >
                  <div className="w-9 h-9 rounded-full bg-purple-900/30 border border-purple-700/30 flex items-center justify-center font-black text-sm text-[var(--color-purple-light)] shrink-0">
                    {p.name.charAt(0)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#e2d9f3] truncate">
                      {p.name}
                    </p>

                    <p className="font-mono text-[11px] text-[var(--color-muted)] truncate">
                      {p.email}
                      {p.city ? ` · ${p.city}` : ""}
                    </p>
                  </div>

                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalPerson(p);
                        setModalMode("edit");
                        setModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 bg-amber-500/10 border border-amber-500/25 text-amber-400 rounded-lg text-xs font-bold hover:bg-amber-500/20 transition-colors"
                    >
                      Editar
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalPerson(p);
                        setModalMode("delete");
                        setModalOpen(true);
                      }}
                      className="px-2.5 py-1.5 bg-red-500/10 border border-red-500/20 text-[var(--color-red)] rounded-lg text-xs font-bold hover:bg-red-500/20 transition-colors"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        open={modalOpen}
        title={modalPerson ? modalPerson.name : "Registro"}
        onClose={() => setModalOpen(false)}
      >
        {modalPerson && modalMode === "view" && (
          <div>
            <p className="font-bold">{modalPerson.name}</p>
            <p className="font-mono text-sm">{modalPerson.email}</p>
            <p className="font-mono text-sm">{modalPerson.city}</p>

            {modalPerson.address && (
              <div className="mt-3 bg-[var(--color-bg3)] border border-purple-900/20 rounded-lg p-3">
                <p className="font-mono text-xs text-[var(--color-muted)]">
                  CEP
                </p>
                <p className="font-bold text-sm">{modalPerson.address.cep}</p>
                <p className="font-mono text-xs text-[var(--color-muted)] mt-2">
                  Logradouro
                </p>
                <p className="font-bold text-sm">
                  {modalPerson.address.logradouro || "—"}
                </p>
                <p className="font-mono text-xs text-[var(--color-muted)] mt-2">
                  Bairro
                </p>
                <p className="font-bold text-sm">
                  {modalPerson.address.bairro || "—"}
                </p>
                <p className="font-mono text-xs text-[var(--color-muted)] mt-2">
                  Cidade · Estado
                </p>
                <p className="font-bold text-sm">
                  {modalPerson.address.localidade || "—"} ·{" "}
                  {modalPerson.address.uf || "—"}
                </p>
              </div>
            )}

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setModalMode("edit")}
                className="px-3 py-2 bg-amber-500/10 border border-amber-500/25 text-amber-400 rounded-lg"
              >
                Editar
              </button>
              <button
                onClick={() => setModalMode("delete")}
                className="px-3 py-2 bg-red-500/20 border border-red-500/25 text-[var(--color-red)] rounded-lg"
              >
                Deletar
              </button>
            </div>
          </div>
        )}

        {modalPerson && modalMode === "edit" && (
          <div>
            <p className="font-bold mb-3">Editar {modalPerson.name}</p>
            <PersonForm
              initial={modalPerson}
              onSubmit={(data) => {
                // ensure id is included
                const withId = { ...(data as any), id: modalPerson.id };
                handleSubmit(withId as any);
                setModalOpen(false);
              }}
              submitLabel="Salvar alterações"
            />
          </div>
        )}

        {modalPerson && modalMode === "delete" && (
          <div>
            <p className="font-bold">Confirmar exclusão</p>
            <p className="font-mono text-sm text-[var(--color-dim)]">Tem certeza que deseja excluir {modalPerson.name}? Esta ação não pode ser desfeita.</p>
            <div className="mt-4 flex gap-2">
              <button onClick={() => { remove(modalPerson.id); }} className="px-3 py-2 bg-red-500/20 border border-red-500/25 text-[var(--color-red)] rounded-lg">Confirmar exclusão</button>
              <button onClick={() => setModalOpen(false)} className="px-3 py-2 bg-[var(--color-bg)] rounded-lg">Cancelar</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default CrudPage;
