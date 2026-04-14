import { useEffect } from 'react';

export type EasterEggType = 'cinematic' | 'matrix' | 'cut' | '35mm' | 'grade';

export function useEasterEggs() {
  useEffect(() => {
    let inputSequence = '';
    const codes: Record<string, EasterEggType> = {
      'action': 'cinematic',
      'render': 'matrix',
      'cut': 'cut',
      '35mm': '35mm',
      'grade': 'grade'
    };
    const maxLength = Math.max(...Object.keys(codes).map(k => k.length));

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Allow alphanumeric characters
      if (/^[a-zA-Z0-9]$/.test(e.key)) {
        inputSequence += e.key.toLowerCase();
        if (inputSequence.length > maxLength) {
          inputSequence = inputSequence.slice(-maxLength);
        }

        for (const [code, type] of Object.entries(codes)) {
          if (inputSequence.endsWith(code)) {
            window.dispatchEvent(new CustomEvent('easterEgg', { detail: type }));
            inputSequence = ''; // Reset after triggering
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
