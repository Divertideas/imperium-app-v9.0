import React from 'react';
import { BackButton } from '../components/BackButton';
import { INSTRUCTIONS_TEXT } from '../content/instructions';

export default function InstructionsPage() {
  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <h1 style={{ marginTop: 0 }}>Instrucciones</h1>
        <BackButton fallback="/" />
      </div>

      <div className="card">
        <div className="instructionsText">{INSTRUCTIONS_TEXT}</div>
      </div>
    </div>
  );
}
