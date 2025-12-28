import React, { useEffect, useRef, useState } from 'react';
import { empireName, useGameStore } from '../store/gameStore';
import type { EmpireId } from '../store/types';

type PlanetOwner = string;

function ownerLabel(owner: PlanetOwner): string {
  if (owner === 'free') return 'Libre';
  if (owner === 'destroyed') return 'Destruido';
  if (isEmpireId(owner)) return empireName(owner);
  return String(owner);
}

function isEmpireId(v: unknown): v is EmpireId {
  return v === 'primus' || v === 'xilnah' || v === 'navui' || v === 'tora' || v === 'miradu';
}

function PlanetNodesPanel({
  planetId,
  planetNumber,
}: {
  planetId: string;
  planetNumber?: number;
}) {
  const store = useGameStore();
  const planet = store.planets[planetId];
  const [editMode, setEditMode] = useState(false);

  // When editing nodes, lock page scroll so Android does not swallow the first tap.
  useEffect(() => {
    if (!editMode) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [editMode]);

  const [imgOk, setImgOk] = useState(true);
  const [notice, setNotice] = useState<string>('');
  const editWrapRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  // Android (mobile/tablet) can sometimes swallow a quick tap for pointer events
  // on images while still delivering touch events. We handle BOTH and suppress
  // duplicate placement when both fire.
  // NOTE: we avoid relying on `click` for Android; we handle node placement using pointer events.

  const src = planetNumber ? `/planet-nodes/${planetNumber}.png` : undefined;

  useEffect(() => {
    // When planet number changes, try loading the image again.
    setImgOk(true);
  }, [src]);

  const points = planet?.nodePoints ?? [];
  const active = planet?.nodeActive ?? [];

  const toggleActive = (idx: number) => {
    const currently = Boolean(active[idx]);
    const nextValue = !currently;

    // Activating a node costs 1 credit. Deactivating never refunds.
    if (nextValue) {
      const currentEmpire = store.getCurrentEmpire();
      const owner = store.planets[planetId]?.owner ?? 'free';
      const payEmpire: EmpireId | null = isEmpireId(owner)
        ? owner
        : (currentEmpire ?? null);

      if (!payEmpire) {
        setNotice('No hay un imperio activo para aplicar el coste del nodo.');
        return;
      }

      const credits = store.credits[payEmpire] ?? 0;
      if (credits < 1) {
        setNotice('No hay créditos suficientes para activar este nodo.');
        store.showToast('No tienes créditos suficientes');
        return;
      }
      store.incCredits(payEmpire, -1);
    }

    // Clearing a node never refunds credits.
    setNotice('');

    const next = points.map((_, i) => (i === idx ? nextValue : Boolean(active[i])));
    store.savePlanet(planetId, { nodeActive: next });
  };

  // --- Node placement handlers (Android + desktop)
  // We place/remove nodes using pointer events + (clientX/clientY + getBoundingClientRect).
  // This avoids Android's delayed click heuristics and works on phone/tablet/desktop.
  const pointsRef = React.useRef(points);
  const activeRef = React.useRef(active);
  const editRef = React.useRef(editMode);
  // Android/Chrome can delay or swallow the first synthetic pointer/click after a tap.
  // We attach a *native* touchstart (passive:false, capture) to guarantee single-tap behavior.
  const lastTouchHandledRef = React.useRef<number>(0);

  // Toggle edit mode and update the ref synchronously.
  // This fixes an Android quirk where the very first tap after enabling edit mode
  // can read a stale "false" value (making it feel like a double-tap is required).
  const toggleEditMode = () => {
    setEditMode((v) => {
      const nv = !v;
      editRef.current = nv;
      // On Android, if an <input> was focused (keyboard open), the first tap on the image
      // is often consumed just to dismiss the keyboard. Blurring immediately when entering
      // edit mode ensures the very next tap places a node (single-tap behavior).
      if (nv) {
        try {
          const ae = document.activeElement as HTMLElement | null;
          ae?.blur?.();
        } catch {
          // ignore
        }
      }
      return nv;
    });
  };

  // Keep refs in sync *synchronously* on every render so the very first tap
  // after enabling edit mode is not missed on Android.
  pointsRef.current = points;
  activeRef.current = active;
  editRef.current = editMode;

  // NOTE: We intentionally avoid relying on `click` for Android.
  // In edit mode we place/remove nodes using pointer events (clientX/clientY + getBoundingClientRect).
  // This is robust across Android phones/tablets and desktop.

  const resolveRect = () => {
    const imgRect = imgRef.current?.getBoundingClientRect();
    return imgRect ?? editWrapRef.current?.getBoundingClientRect() ?? null;
  };

  const applyTapAtClientXY = (clientX: number, clientY: number) => {
    if (!editRef.current) return;
    const rect = resolveRect();
    if (!rect) return;
    const nx = (clientX - rect.left) / rect.width;
    const ny = (clientY - rect.top) / rect.height;
    if (!Number.isFinite(nx) || !Number.isFinite(ny)) return;
    if (nx < 0 || nx > 1 || ny < 0 || ny > 1) return;

    const currentPoints = pointsRef.current;
    const currentActive = activeRef.current;

    // If user taps near an existing node, delete it.
    const R = 22; // px hit radius
    let hit = -1;
    for (let i = 0; i < currentPoints.length; i++) {
      const px = currentPoints[i]?.x ?? 0;
      const py = currentPoints[i]?.y ?? 0;
      const hdx = (px - nx) * rect.width;
      const hdy = (py - ny) * rect.height;
      if (hdx * hdx + hdy * hdy <= R * R) {
        hit = i;
        break;
      }
    }
    if (hit >= 0) {
      store.savePlanet(planetId, {
        nodePoints: currentPoints.filter((_, i) => i !== hit),
        nodeActive: currentActive.filter((_, i) => i !== hit),
      });
      return;
    }

    // Otherwise add a new node.
    store.savePlanet(planetId, {
      nodePoints: [...currentPoints, { x: nx, y: ny }],
      nodeActive: [...currentActive, false],
    });
  };

  const onEditPointerDownCapture = (e: React.PointerEvent) => {
    if (!editMode) return;
    // If we just handled a real touchstart via native listener, ignore the synthetic pointer.
    if (Date.now() - lastTouchHandledRef.current < 350) return;
    // Prevent scroll/gesture recognizers from stealing the tap.
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
    applyTapAtClientXY(e.clientX, e.clientY);
  };

  // Native touchstart capture for Android (works even when React's touch listeners are passive).
  React.useEffect(() => {
    if (!editMode) return;
    const el = editWrapRef.current;
    if (!el) return;

    // Touch-first placement on Android: capture the very first tap and prevent the page from treating it as a scroll gesture.
    const handler = (e: TouchEvent) => {
      if (!editMode) return;
      if (e.touches.length !== 1) return;
      e.preventDefault();
      e.stopImmediatePropagation();

      const t = e.touches[0];
      const rect = el.getBoundingClientRect();
      const x = (t.clientX - rect.left) / rect.width;
      const y = (t.clientY - rect.top) / rect.height;
      handleEditTap(x, y);
    };

    el.addEventListener('touchstart', handler, { passive: false, capture: true });

    return () => el.removeEventListener('touchstart', handler as any, { capture: true } as any);
  }, [editMode]);

  const removePoint = (idx: number) => {
    const nextPoints = points.filter((_, i) => i !== idx);
    const nextActive = active.filter((_, i) => i !== idx);
    store.savePlanet(planetId, { nodePoints: nextPoints, nodeActive: nextActive });
  };

  const resetPoints = () => {
    store.savePlanet(planetId, { nodePoints: [], nodeActive: [] });
  };

  return (
    <>
      <div className="nodes-panel">
      <div className="row between">
        <div className="nodes-title">Ramificación de nodos</div>
        <div className="row wrap">
          <button className="ghost" type="button" onClick={toggleEditMode} disabled={!planetNumber}>
            {editMode ? 'Terminar edición' : 'Editar nodos'}
          </button>
          {editMode ? (
            <button className="ghost" type="button" onClick={resetPoints}>
              Reiniciar
            </button>
          ) : null}
        </div>
      </div>

      {!planetNumber ? (
        <div className="muted small">Introduce el número del planeta para mostrar la ramificación.</div>
      ) : editMode ? (
        <div className="muted small">Editor abierto en pantalla completa.</div>
      ) : (
        <div className="nodes-image-wrap" style={{ touchAction: 'pan-y' }}>
          {imgOk ? (
            <img
              key={src}
              ref={imgRef}
              src={src}
              alt={`Nodos planeta ${planetNumber}`}
              draggable={false}
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="muted small">No se ha encontrado la imagen de nodos para el planeta {planetNumber}.</div>
          )}

          {points.map((p, i) => (
            <button
              key={i}
              type="button"
              className={`node-dot ${active[i] ? 'active' : ''}`}
              style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
              onClick={(e) => {
                e.stopPropagation();
                toggleActive(i);
              }}
              title={active[i] ? 'Desactivar nodo' : 'Activar nodo'}
            />
          ))}
        </div>
      )}

      {notice ? <div className="danger small" style={{ marginTop: 8 }}>{notice}</div> : null}
    </div>

    {editMode ? (
      <div className="nodes-editor-overlay" role="dialog" aria-modal="true">
        <div className="nodes-editor-card">
          <div className="row between" style={{ marginBottom: 10 }}>
            <div className="nodes-title">Editar nodos — planeta {planetNumber}</div>
            <div className="row wrap">
              <button className="ghost" type="button" onClick={toggleEditMode}>Aceptar</button>
            </div>
          </div>

          <div
            className="nodes-image-wrap editing"
            ref={editWrapRef}
            onPointerDownCapture={onEditPointerDownCapture}
            style={{ touchAction: 'none' }}
          >
            {imgOk ? (
              <img
                key={src}
                ref={imgRef}
                src={src}
                alt={`Nodos planeta ${planetNumber}`}
                draggable={false}
                style={{ pointerEvents: 'none' }}
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className="muted small">No se ha encontrado la imagen de nodos para el planeta {planetNumber}.</div>
            )}

            {points.map((p, i) => (
              <button
                key={i}
                type="button"
                className={`node-dot ${active[i] ? 'active' : ''}`}
                style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  removePoint(i);
                }}
                title={'Quitar nodo'}
              />
            ))}
          </div>

          <div className="muted small" style={{ marginTop: 10 }}>
            Toca sobre cada círculo blanco del PNG para crear un punto. Tocar un punto lo elimina.
          </div>

          <div className="row wrap" style={{ marginTop: 12 }}>
            <button className="ghost" type="button" onClick={resetPoints}>Reiniciar</button>
            <button className="ghost" type="button" onClick={toggleEditMode}>Cerrar</button>
          </div>
        </div>
      </div>
    ) : null}
  </>
  );
}

export function PlanetSheet(props: { planetId: string; mode?: 'full' | 'inline' }) {
  const { planetId, mode = 'full' } = props;
  const store = useGameStore();
  const planet = store.planets[planetId];
  const [msg, setMsg] = useState<string>('');
  // We keep a draft string so typing "2" never reserves/validates numbers until the user explicitly confirms.
  const [draftNumber, setDraftNumber] = useState<string>('');

  if (!planet) return null;

  useEffect(() => {
    setDraftNumber(planet.number === undefined || planet.number === null ? '' : String(planet.number));
  }, [planet.number]);

  const bindNumber = (num?: number) => {
    if (!num) {
      store.savePlanet(planetId, { number: undefined });
      return;
    }
    // Planet numbers must be unique for the whole partida.
    const existingId = store.planetByNumber[num];
    if (existingId && existingId !== planetId) {
      const existing = store.planets[existingId];
      if (existing?.destroyedPermanently || existing?.owner === 'destroyed') {
        setMsg('Este planeta está destruido permanentemente y su número no puede volver a usarse en la partida.');
      } else {
        setMsg('Ese número de planeta ya está registrado en la partida.');
      }
      return;
    }
    setMsg('');
    store.bindPlanetNumber(planetId, num);
  };

  const toggleDestroyed = () => {
    if (!planet.destroyedPermanently) {
      const ok = confirm('Este planeta quedará destruido permanentemente y no podrá volver a usarse en la partida. ¿Confirmar?');
      if (!ok) return;
      store.setPlanetDestroyed(planetId, true);
      setMsg('Planeta marcado como DESTRUIDO permanentemente.');
    }
  };

  return (
    <div className="planet-sheet">
      {mode === 'inline' ? (
        <div className="row between">
          <h3>Planeta</h3>
          <a className="ghost" href={`#/planet/${planetId}`}>Abrir ficha</a>
        </div>
      ) : null}

      <div className="grid two">
        <div className="field">
          <span>Número de planeta</span>
          <div className="row gap">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={draftNumber}
              onChange={(e) => setDraftNumber(e.target.value)}
              placeholder="1–66"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const cleaned = draftNumber.replace(/[^0-9]/g, '').trim();
                  const num = cleaned === '' ? undefined : Number(cleaned);
                  bindNumber(Number.isFinite(num as number) ? (num as number) : undefined);
                }
              }}
            />
            <button
              type="button"
              className="btn"
              onClick={() => {
                const cleaned = draftNumber.replace(/[^0-9]/g, '').trim();
                const num = cleaned === '' ? undefined : Number(cleaned);
                bindNumber(Number.isFinite(num as number) ? (num as number) : undefined);
              }}
            >
              Guardar
            </button>
          </div>
          <small className="muted">Pulsa “Guardar” (o Enter) para confirmar el número. Así no se bloquean números parciales mientras escribes.</small>
        </div>

        <label className="field">
          <span>Propietario</span>
          <input value={ownerLabel(planet.owner as PlanetOwner)} readOnly />
          <small className="muted">Se gestiona normalmente mediante “Planeta conquistado” en combate planetario.</small>

          {/* Some book effects can make an owned planet become neutral while keeping its sheet intact. */}
          {planet.owner !== 'free' && planet.owner !== 'destroyed' && !planet.destroyedPermanently ? (
            <div className="row" style={{ marginTop: 8 }}>
              <button
                type="button"
                className="ghost"
                onClick={() => {
                  if (!confirm('¿Marcar este planeta como LIBRE? Mantendrá estadísticas y nodos, pero dejará de pertenecer al imperio.')) return;
                  const res = store.releasePlanetToFree(planetId);
                  setMsg(res.ok ? 'Planeta marcado como LIBRE (mantiene estadísticas y nodos).' : res.reason);
                }}
              >
                Marcar como libre
              </button>
            </div>
          ) : null}
        </label>

        <label className="field">
          <span>Producción (actual)</span>
          <input
            type="number"
            value={planet.prod ?? ''}
            onChange={(e) => store.savePlanet(planetId, { prod: e.target.value === '' ? undefined : Number(e.target.value) })}
          />
        </label>

        <label className="field">
          <span>Ataque (actual)</span>
          <input
            type="number"
            value={planet.atk ?? ''}
            onChange={(e) => store.savePlanet(planetId, { atk: e.target.value === '' ? undefined : Number(e.target.value) })}
          />
        </label>

        <label className="field">
          <span>Defensa (actual)</span>
          <input
            type="number"
            value={planet.def ?? ''}
            onChange={(e) => store.savePlanet(planetId, { def: e.target.value === '' ? undefined : Number(e.target.value) })}
          />
        </label>

        <label className="field">
          <span>PR máximos</span>
          <input
            type="number"
            value={planet.prMax ?? ''}
            onChange={(e) => store.savePlanet(planetId, { prMax: e.target.value === '' ? undefined : Number(e.target.value) })}
          />
        </label>

        <label className="field">
          <span>PR marcados</span>
          <input
            type="number"
            value={planet.prMarked ?? 0}
            onChange={(e) => store.savePlanet(planetId, { prMarked: Math.floor(Number(e.target.value) || 0) })}
          />
        </label>
      </div>

      <div className="subpanel">
        <h4>Habilidad especial (texto)</h4>
        <textarea
          value={planet.abilityText ?? ''}
          onChange={(e) => store.savePlanet(planetId, { abilityText: e.target.value })}
          rows={3}
        />
      </div>

      <PlanetNodesPanel planetId={planetId} planetNumber={planet.number} />

      <div className="subpanel">
        <h4>Planeta destruido</h4>
        <div className="row between">
          <div>
            <strong>Estado:</strong>{' '}
            {planet.destroyedPermanently ? 'DESTRUIDO (permanente)' : 'Operativo'}
          </div>
          {!planet.destroyedPermanently ? (
            <button className="danger" onClick={toggleDestroyed}>Marcar como destruido</button>
          ) : null}
        </div>
        <p className="muted small">Si se destruye permanentemente, ningún imperio podrá conquistarlo.</p>
      </div>

      {msg ? <p className="notice">{msg}</p> : null}
    </div>
  );
}
