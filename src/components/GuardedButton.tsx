import React, { useMemo, useState } from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  cooldownMs?: number;
};

/**
 * UI-only safety: prevents accidental double clicks / double taps.
 * Does not change game rules; it only blocks repeated rapid presses.
 */
export function GuardedButton({ cooldownMs = 600, onClick, disabled, ...rest }: Props) {
  const [locked, setLocked] = useState(false);

  const isDisabled = useMemo(() => Boolean(disabled) || locked, [disabled, locked]);

  return (
    <button
      {...rest}
      disabled={isDisabled}
      onClick={(e) => {
        if (isDisabled) return;
        setLocked(true);
        try {
          onClick?.(e);
        } finally {
          window.setTimeout(() => setLocked(false), cooldownMs);
        }
      }}
    />
  );
}
