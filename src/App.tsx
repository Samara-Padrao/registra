import { Routes, Route, NavLink, Link } from "react-router-dom";
import BackendPage from "./pages/BackendPage";
import ApiPage from "./pages/ApiPage";
import CrudPage from "./pages/CrudPage";
import DashboardPage from "./pages/Dashboard";
import { BsHouse } from "react-icons/bs";

const navItems = [
  { to: "/", label: "Dashboard", icon: BsHouse },
  { to: "/cadastro", label: "Cadastros", num: "01" },
  { to: "/api", label: "CEP", num: "02" },
  { to: "/crud", label: "Gerenciamento CRUD", num: "03" },
];

const App = () => {
  return (
    <div className="flex min-h-screen">
      <nav className="w-56 min-h-screen bg-[var(--color-bg2)] border-r border-purple-900/30 flex flex-col sticky top-0 h-screen">
        <div className="px-5 py-7 border-b border-purple-900/20">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[var(--color-purple)] rounded-lg flex items-center justify-center font-black text-white text-sm">
              R
            </div>
            <h2 className="text-lg font-black text-[var(--color-accent)] tracking-widest">
              REGISTRA
            </h2>
          </Link>
        </div>

        <div className="flex-1 flex flex-col gap-1 p-2.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-bold no-underline transition-all duration-150 border
                ${
                  isActive
                    ? "text-[var(--color-accent)] bg-purple-900/25 border-purple-700/40"
                    : "text-[var(--color-muted)] bg-transparent border-transparent hover:text-[var(--color-accent)] hover:bg-purple-900/10"
                }`
              }
            >
              <span className="font-mono text-[10px] text-[var(--color-dim)]">
                {item.num?? <item.icon className="text-lg" />}
              </span>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="flex-1 p-10 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/cadastro" element={<BackendPage />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="/crud" element={<CrudPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App
