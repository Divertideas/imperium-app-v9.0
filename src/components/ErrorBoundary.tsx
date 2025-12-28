import React from 'react';
import { SAVE_KEY } from '../version';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
  errorCode?: string;
};

/**
 * Safety net: prevents a white screen if a corrupted save or unexpected edge case triggers a crash.
 * This does NOT change the game logic; it only provides a recoverable UI.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    const code = `IMP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    return { hasError: true, error, errorCode: code };
  }

  componentDidCatch(error: Error) {
    // Keep console error for debugging in Vercel logs.
    console.error('[Imperium] UI crash caught by ErrorBoundary:', error);
  }

  private clearSaveAndReload() {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch {
      // ignore
    }
    window.location.reload();
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div style={{ padding: 16, maxWidth: 820, margin: '0 auto' }}>
        <h2 style={{ margin: '8px 0' }}>Se ha producido un error</h2>
        <p style={{ opacity: 0.85, lineHeight: 1.4 }}>
          La app ha encontrado un caso inesperado (a veces pasa por una partida guardada antigua o corrupta).
          Puedes recargar, o borrar la partida guardada para recuperar la app.
        </p>

        <p className="muted" style={{ marginTop: 8 }}>
          Código de error: <strong>{this.state.errorCode ?? '—'}</strong>
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
          <button className="btn" onClick={() => window.location.reload()}>Recargar</button>
          <button className="btn danger" onClick={() => this.clearSaveAndReload()}>Borrar partida guardada y recargar</button>
        </div>

        {this.state.error ? (
          <pre style={{ marginTop: 12, padding: 12, background: 'rgba(255,255,255,0.06)', overflowX: 'auto' }}>
            {String(this.state.error.message || 'Error sin mensaje')}
            {this.state.error.stack ? `\n\n${this.state.error.stack}` : ''}
          </pre>
        ) : null}
      </div>
    );
  }
}
