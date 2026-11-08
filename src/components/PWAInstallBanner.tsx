import React, { useState } from 'react';
import { Smartphone, X, Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed or dismissed by user, don't show
  if (isInstalled || isDismissed) {
    return null;
  }

  // Android / Chromium flow
  if (isInstallable) {
    return (
      <div className="bg-gradient-to-r from-blue-900/90 to-indigo-900/90 border-b border-blue-700/50 px-4 py-2.5 text-white">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4 text-blue-300" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold leading-tight truncate">Installa l'App sul tuo Android</p>
              <p className="text-[11px] text-blue-200 truncate">
                Accedi rapidamente alla rubrica e al calendario anche offline!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={install}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-blue-900 text-xs font-bold shadow hover:bg-blue-50 transition active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Installa</span>
            </button>
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-lg text-blue-300 hover:text-white transition"
              aria-label="Ignora"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <div className="bg-slate-800/90 border-b border-slate-700 px-4 py-2 text-white">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Smartphone className="w-4 h-4 text-blue-400 shrink-0" />
              <p className="text-xs text-slate-300 truncate">
                Installa l'app su iPhone / iPad per usarla a schermo intero
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowIOSGuide(true)}
                className="px-2.5 py-1 rounded-lg bg-blue-600 text-xs font-semibold text-white hover:bg-blue-500 transition"
              >
                Istruzioni
              </button>
              <button
                onClick={() => setIsDismissed(true)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl text-slate-100">
              <h3 className="text-base font-bold text-white">Installa su iPhone / iPad</h3>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                1. Tocca l'icona <strong>Condividi</strong> (il quadrato con la freccia verso l'alto) nella barra di Safari in basso.<br />
                2. Scorri e tocca <strong>"Aggiungi a schermata Home"</strong>.<br />
                3. Tocca <strong>Aggiungi</strong> in alto a destra.
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-xl bg-blue-600 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition"
              >
                Chiudi
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
