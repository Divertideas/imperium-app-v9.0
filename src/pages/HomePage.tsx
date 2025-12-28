import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EMPIRES, useGameStore } from '../store/gameStore';
import type { EmpireId } from '../store/types';
import { APP_VERSION, SAVE_KEY } from '../version';

export default function HomePage() {
  const navigate = useNavigate();
  const newGame = useGameStore(s => s.newGame);
  const resetGame = useGameStore(s => s.resetGame);
  const setup = useGameStore(s => s.setup);

  const [player, setPlayer] = useState<EmpireId>('primus');
  const [rivals, setRivals] = useState<EmpireId[]>(['xilnah']);
  const [planetsToConquer, setPlanetsToConquer] = useState<number>(8);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  const rivalOptions = useMemo(() => EMPIRES.map(e => e.id).filter(id => id !== player), [player]);

  return (
    <div className="page">
      <h1>Imperium — Hoja de registro <span className="muted" style={{ fontSize: 14 }}>v{APP_VERSION}</span></h1>
      <p className="muted">
        Esta app es un complemento del librojuego. La mayoría de datos se registran manualmente.
      </p>

      

      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
          <h2 style={{ margin: 0 }}>Cómo usar esta app con el libro</h2>
          <button className="ghost" type="button" onClick={() => navigate('/instructions')}>
            Instrucciones
          </button>
        </div>
        <ol className="muted" style={{ lineHeight: 1.6 }}>
          <li><strong>Lee el librojuego</strong> y usa la app como hoja de registro (créditos, fichas, turnos y combates).</li>
          <li><strong>No decide por ti:</strong> la app te ayuda a anotar, y el libro te dice las reglas / efectos.</li>
          <li><strong>Consejo:</strong> antes de cerrar el navegador, vuelve al menú y comprueba que “Continuar partida” aparece (significa que se ha guardado).</li>
        </ol>
      </div>

      {/* Allow importing a save even before starting/choosing an empire. */}
      {!setup ? (
        <div className="card">
          <h2>Importar partida</h2>
          <p className="muted" style={{ marginTop: 6 }}>
            Si ya tienes una partida guardada (archivo .json), puedes importarla antes de empezar.
          </p>
          <div className="row wrap" style={{ marginTop: 10 }}>
            <button className="ghost" onClick={() => importInputRef.current?.click()} type="button">
              Importar partida
            </button>
          </div>
          <p className="muted small" style={{ marginTop: 8 }}>
            Importar no cambia el juego: solo restaura tu hoja de registro.
          </p>
        </div>
      ) : null}

      {setup ? (
        <div className="card">
          <h2>Continuar partida</h2>
          <div className="row">
            <button className="primary" onClick={() => navigate('/turn')}>Continuar</button>
            <button className="danger" onClick={() => { if (confirm('¿Borrar la partida guardada?')) resetGame(); }}>Borrar partida</button>
          </div>

          <div className="row wrap" style={{ marginTop: 10 }}>
            <button
              className="ghost"
              onClick={() => {
                try {
                  const raw = localStorage.getItem(SAVE_KEY);
                  if (!raw) {
                    alert('No hay partida guardada para exportar.');
                    return;
                  }
                  const blob = new Blob([raw], { type: 'application/json;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `imperium-save-${APP_VERSION}.json`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                } catch {
                  alert('No se pudo exportar la partida.');
                }
              }}
            >
              Exportar partida
            </button>

            <button className="ghost" onClick={() => importInputRef.current?.click()} type="button">
              Importar partida
            </button>
          </div>

          <p className="muted small" style={{ marginTop: 8 }}>
            Exportar/Importar no cambia el juego: sirve para hacer copia de seguridad o pasar la partida a otro dispositivo.
          </p>
        </div>
      ) : (
        <div className="card">
          <h2>Nueva partida</h2>

          <label className="field">
            <span>Tu imperio</span>
            <select value={player} onChange={(e) => {
              const id = e.target.value as EmpireId;
              setPlayer(id);
              setRivals(r => r.filter(x => x !== id));
            }}>
              {EMPIRES.map(e => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Imperios rivales (selección libre)</span>
            <div className="chips">
              {rivalOptions.map(id => {
                const e = EMPIRES.find(x => x.id === id)!;
                const on = rivals.includes(id);
                return (
                  <button
                    key={id}
                    className={on ? 'chip on' : 'chip'}
                    onClick={() => {
                      setRivals(prev => on ? prev.filter(x => x !== id) : [...prev, id]);
                    }}
                    type="button"
                  >
                    {e.name}
                  </button>
                );
              })}
            </div>
          </label>

          <label className="field">
            <span>Dificultad (planetas a conquistar)</span>
            <input
              type="number"
              min={1}
              value={planetsToConquer}
              onChange={(e) => setPlanetsToConquer(Math.max(1, Math.floor(Number(e.target.value) || 1)))}
            />
            <small className="muted">La dificultad depende del número de planetas a conquistar, no del nº de imperios.</small>
          </label>

          <div className="row">
            <button
              className="primary"
              onClick={() => {
                newGame({ playerEmpireId: player, rivalEmpireIds: rivals, planetsToConquer });
                navigate('/turn');
              }}
              disabled={rivals.length === 0}
            >
              Empezar
            </button>
          </div>
        </div>
      )}

      {/* Single hidden file input used by both "Importar" buttons */}
      <input
        ref={importInputRef}
        type="file"
        accept="application/json"
        style={{ display: 'none' }}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          e.target.value = '';
          if (!file) return;
          try {
            const text = await file.text();
            JSON.parse(text); // validate JSON
            localStorage.setItem(SAVE_KEY, text);
            window.location.reload();
          } catch {
            alert('Ese archivo no parece una partida válida.');
          }
        }}
      />
    </div>
  );
}
