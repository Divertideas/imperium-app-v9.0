import React, { useMemo } from 'react';
import { BackButton } from '../components/BackButton';
import { INSTRUCTIONS, InstructionBlock } from '../content/instructions';

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderBlock(block: InstructionBlock, idx: number) {
  if (block.type === 'p') {
    return (
      <p key={`p-${idx}`} className="instructionsP">
        {block.text}
      </p>
    );
  }

  if (block.type === 'ul') {
    return (
      <ul key={`ul-${idx}`} className="instructionsList">
        {block.items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    );
  }

  if (block.type === 'ol') {
    return (
      <ol key={`ol-${idx}`} className="instructionsList">
        {block.items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ol>
    );
  }

  return null;
}

export default function InstructionsPage() {
  const docTitle = INSTRUCTIONS[0]?.title ?? 'Instrucciones';

  const toc = useMemo(() => {
    return INSTRUCTIONS.slice(1).map(s => ({ id: s.id, title: s.title }));
  }, []);

  const introBlocks = INSTRUCTIONS[0]?.blocks ?? [];

  return (
    <div className="page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <h1 style={{ marginTop: 0 }}>{docTitle}</h1>
        <BackButton fallback="/" />
      </div>

      {toc.length ? (
        <div className="card">
          <div className="instructionsTocTitle">Índice</div>
          <div className="instructionsToc">
            {toc.map(item => (
              <button
                key={item.id}
                type="button"
                className="ghost small"
                onClick={() => scrollToId(item.id)}
                style={{ textAlign: 'left' }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="card instructions">
        <div className="instructionsIntro">
          {introBlocks.map((b, i) => renderBlock(b as InstructionBlock, i))}
        </div>

        {INSTRUCTIONS.slice(1).map((section, si) => (
          <section key={section.id} className="instructionsSection">
            <h2 id={section.id} className="instructionsH2">
              {section.title}
            </h2>
            {section.blocks.map((b, i) => renderBlock(b as InstructionBlock, 1000 + si * 100 + i))}
          </section>
        ))}
      </div>
    </div>
  );
}
