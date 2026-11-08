import React from 'react';
import { BookUser, Calendar, Download, HelpCircle, Smartphone } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface HeaderProps {
  activeTab: 'contacts' | 'calendar';
  onTabChange: (tab: 'contacts' | 'calendar') => void;
  onOpenInfo: () => void;
  onDownloadAllContacts: () => void;
  onDownloadAllCalendar: () => void;
  contactsCount: number;
  eventsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenInfo,
  onDownloadAllContacts,
  onDownloadAllCalendar,
  contactsCount,
  eventsCount,
}) => {
  const { isInstallable, isInstalled, install, isIOS } = usePWAInstall();

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 py-3">
        {/* Top bar with Branding & Actions */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-amber-500 p-0.5 shadow-md shadow-blue-950/50 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <span className="text-amber-400 font-bold text-base tracking-tighter">1^</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">1^ Comunità S.AP.</h1>
                <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Android &amp; PWA
                </span>
              </div>
              <p className="text-xs text-slate-400">Rubrica Telefonica &amp; Calendario Preparazioni</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Install button if not already standalone */}
            {!isInstalled && isInstallable && (
              <button
                onClick={install}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-sm transition active:scale-95"
                title="Installa l'app su Android"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Installa App</span>
                <span className="sm:hidden">Installa</span>
              </button>
            )}

            {/* Quick Bulk Download based on current tab */}
            {activeTab === 'contacts' ? (
              <button
                onClick={onDownloadAllContacts}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition active:scale-95"
                title="Scarica tutti gli 85 contatti (.vcf per Android)"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden md:inline">Scarica Tutti (.vcf)</span>
                <span className="md:hidden">Tutti .vcf</span>
              </button>
            ) : (
              <button
                onClick={onDownloadAllCalendar}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition active:scale-95"
                title="Scarica tutto il calendario (.ics per Google Calendar)"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden md:inline">Esporta Calendario (.ics)</span>
                <span className="md:hidden">Tutto .ics</span>
              </button>
            )}

            {/* Help / Guide */}
            <button
              onClick={onOpenInfo}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              title="Guida all'uso per cellulare Android e Google Calendar"
              aria-label="Istruzioni e guida"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher - Clean, zero-pill segmented controls */}
        <div className="mt-3 grid grid-cols-2 p-1 bg-slate-950/70 border border-slate-800/80 rounded-xl">
          <button
            onClick={() => onTabChange('contacts')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'contacts'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <BookUser className="w-4 h-4 shrink-0" />
            <span>Rubrica Contatti</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded ${
                activeTab === 'contacts' ? 'bg-blue-800/60 text-blue-100' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {contactsCount}
            </span>
          </button>

          <button
            onClick={() => onTabChange('calendar')}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'calendar'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Calendario</span>
            <span
              className={`text-[11px] px-1.5 py-0.2 rounded ${
                activeTab === 'calendar' ? 'bg-amber-800/60 text-amber-100' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {eventsCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
