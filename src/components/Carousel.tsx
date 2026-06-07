import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi";
import { crudSteps } from "../utils";

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % crudSteps.length),
      3000,
    );
    return () => clearInterval(t);
  }, [auto]);

  const go = (dir: number) => {
    setAuto(false);
    setCurrent((c) => (c + dir + crudSteps.length) % crudSteps.length);
  };
  const s = crudSteps[current];

  return (
    <div>
      <div
        className={`${s.bg} border ${s.ring} rounded-2xl p-16 text-center mb-5 transition-all duration-500 min-h-64 flex flex-col items-center justify-center`}
      >
        <div className="text-7xl font-black mb-5" style={{ color: s.color }}>
          {s.letter}
        </div>

        <h2 className="text-4xl font-black mb-3" style={{ color: s.color }}>
          {s.title}
        </h2>

        <p className="font-mono text-sm text-[var(--color-muted)]">{s.desc}</p>
      </div>

      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => go(-1)}
          className="w-11 h-11 rounded-xl bg-[var(--color-bg2)] border border-purple-900/30 text-[#e2d9f3] text-lg hover:border-purple-600/50 transition-colors flex items-center justify-center"
        >
          <FiChevronLeft />
        </button>

        <div className="flex gap-2">
          {crudSteps.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAuto(false);
                setCurrent(i);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? "w-7 bg-[var(--color-purple)]" : "w-2.5 bg-[var(--color-bg3)] hover:bg-purple-800"}`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          className="w-11 h-11 rounded-xl bg-[var(--color-bg2)] border border-purple-900/30 text-[#e2d9f3] text-lg hover:border-purple-600/50 transition-colors flex items-center justify-center"
        >
          <FiChevronRight />
        </button>
      </div>

      <div className="flex justify-center mb-7">
        <button
          onClick={() => setAuto((a) => !a)}
          className={`px-5 py-2 rounded-xl text-sm font-bold border transition-colors ${auto ? "bg-purple-900/25 border-purple-600/40 text-[var(--color-accent)]" : "bg-[var(--color-bg2)] border-purple-900/30 text-[var(--color-muted)]"}`}
        >
          {auto ? (
            <>
              <FiPause className="inline mr-2" /> Pausar auto
            </>
          ) : (
            <>
              <FiPlay className="inline mr-2" /> Retomar auto
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
