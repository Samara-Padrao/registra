import { useNavigate } from "react-router-dom";
import { FiDatabase, FiLayers, FiMapPin } from "react-icons/fi";
import Carousel from "../components/Carousel";

const FEATURES = [
  {
    icon: <FiDatabase />,
    title: "Cadastro",
    desc: "Persistência de dados simulando um banco de dados back-end.",
    to: "/cadastro",
  },
  {
    icon: <FiMapPin />,
    title: "Busca de CEP",
    desc: "Consulta de endereço em tempo real com a ViaCEP API.",
    to: "/api",
  },
  {
    icon: <FiLayers />,
    title: "CRUD",
    desc: "Sistema completo de Criar, Ler, Atualizar e Excluir.",
    to: "/crud",
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-12">
      <div className="relative overflow-hidden bg-[var(--color-bg2)] border border-purple-900/30 rounded-2xl px-10 py-12">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-700/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative">
          <span className="inline-block font-mono text-[11px] text-[var(--color-dim)] tracking-widest mb-4 uppercase">
            bem-vindo ao
          </span>

          <h1 className="text-6xl font-black text-[var(--color-accent)] tracking-widest mb-4">
            REGISTRA
          </h1>

          <p className="text-[var(--color-muted)] text-base leading-relaxed max-w-xl font-mono">
            A sua plataforma gerenciamento de dados! <br />
            Cadastre pessoas, busque endereços por CEP e gerencie registros com
            um CRUD completo: tudo em um só lugar.
          </p>

          <div className="flex gap-3 mt-8">
            <button
              onClick={() => navigate("/cadastro")}
              className="uppercase hover:scale-105 active:scale-95 px-6 py-3 bg-[var(--color-purple)] hover:bg-purple-600 
              text-white rounded-xl font-bold text-sm transition-all"
            >
              Começar agora
            </button>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-[_2fr_1fr] gap-6">
      <Carousel />
     
        <div className="flex flex-col gap-4 ">
          {FEATURES.map((f) => (
            <button
              key={f.to}
              onClick={() => navigate(f.to)}
              className="text-left bg-[var(--color-bg2)] gap-4  items-center flex justify-between border border-purple-900/25 hover:border-purple-700/50 rounded-2xl p-5 transition-all hover:-translate-y-0.5 group"
            >
              <div className="w-full">
                  <div className="w-9 h-9 rounded-xl bg-purple-900/30 border border-purple-800/30 flex items-center justify-center text-[var(--color-purple-light)] mb-4 group-hover:bg-purple-800/40 transition-colors">
                    {f.icon}
                  </div>
                  <p className="font-bold text-sm text-[#e2d9f3] mb-1.5 white-space-nowrap">
                    {f.title}
                  </p>
              </div>

              <p className="font-mono text-[11px] text-[var(--color-muted)] leading-relaxed">
                {f.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
