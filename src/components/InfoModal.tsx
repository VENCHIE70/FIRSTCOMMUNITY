import React from 'react';
import { X, Smartphone, Calendar, UserPlus, CheckCircle, ExternalLink, Globe } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/90 rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Guida all'Uso per Android e Google
              </h2>
              <p className="text-xs text-slate-400">1^ Comunità S.AP. · Rubrica &amp; Calendario</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6 text-sm text-slate-300">
          {/* Section 1: Salvare i contatti sul cellulare */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <UserPlus className="w-4 h-4 text-blue-400" />
              <h3>1. Come salvare i contatti sul cellulare Android</h3>
            </div>
            <ul className="space-y-2 text-xs leading-relaxed text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Singolo contatto:</strong> tocca il pulsante blu{' '}
                  <span className="text-blue-300 font-semibold">"Salva nei Contatti del Telefono"</span> su qualsiasi
                  scheda. Verrà generato il file standard <code className="text-amber-300">.vcf</code>: toccalo dal
                  pannello notifiche o download per aprirlo con l'app <em>Contatti di Android / Google Contatti</em> e
                  confermare il salvataggio.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Tutti gli 85 contatti insieme:</strong> tocca in alto{' '}
                  <span className="text-blue-300 font-semibold">"Scarica Tutti (.vcf)"</span>. Con un solo file puoi
                  importare l'intera rubrica della comunità in pochi secondi sul telefono!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Chiamate dirette &amp; WhatsApp:</strong> puoi toccare l'icona verde della cornetta per
                  chiamare subito, o l'icona di WhatsApp per aprire direttamente la chat con quella persona.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 2: Google Calendar */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Calendar className="w-4 h-4 text-amber-400" />
              <h3>2. Come scaricare gli eventi su Google Calendar del cellulare</h3>
            </div>
            <ul className="space-y-2 text-xs leading-relaxed text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Aggiunta immediata:</strong> tocca il pulsante{' '}
                  <span className="text-blue-300 font-semibold">"Aggiungi a Google Calendar"</span> su qualsiasi
                  evento. Sul cellulare Android si aprirà l'app Google Calendar con titolo, orario, luogo e gruppo di
                  preparazione già precompilati; basta toccare "Salva"!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Tutto il calendario completo (.ics):</strong> tocca in alto{' '}
                  <span className="text-amber-300 font-semibold">"Esporta Calendario (.ics)"</span>. Scarica un unico
                  file calendario standard con tutti i 19 eventi di Novembre, Dicembre 2026 e Gennaio 2027.
                </span>
              </li>
            </ul>
          </div>

          {/* Section 3: Installare l'app su Android (PWA) */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              <h3>3. Installare l'app su schermata Home Android</h3>
            </div>
            <p className="text-xs leading-relaxed">
              Questa applicazione è una <strong>PWA (Progressive Web App)</strong> completa. Per averla sempre
              sulla schermata principale del cellulare:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-xs text-slate-300">
              <li>Apri il link con Google Chrome sul tuo Android.</li>
              <li>Tocca il pulsante verde <strong>"Installa App"</strong> in alto, oppure premi i tre puntini ⋮ di Chrome.</li>
              <li>Seleziona <strong>"Aggiungi a schermata Home"</strong> / <strong>"Installa applicazione"</strong>.</li>
              <li>L'app avrà la sua icona dedicata e funzionerà a schermo intero anche senza connessione internet!</li>
            </ol>
          </div>

          {/* Section 4: Vercel */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-1.5">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Globe className="w-4 h-4 text-cyan-400" />
              <h3>4. Pubblicazione su Vercel</h3>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              Il progetto è un'applicazione React + Vite standard, già ottimizzata con service worker e manifest. Può
              essere distribuita su <strong>Vercel</strong> semplicemente collegando la repository GitHub o eseguendo il comando{' '}
              <code className="text-amber-300">vercel deploy</code>.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition active:scale-95"
          >
            Ho Capito, Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
