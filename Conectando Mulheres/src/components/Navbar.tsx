import React, { useState } from 'react';
import { useProjectData } from '../context/ProjectContext';
import { Settings, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenAdminModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdminModal }) => {
  const { settings } = useProjectData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Linha do Tempo', href: '#jornada' },
    { name: 'Pilares', href: '#pilares' },
    { name: 'Equipe', href: '#equipe' },
    { name: 'Impacto', href: '#impacto' },
  ];

  return (
    <>
      {/* Desktop Navigation Bar (Hidden on Mobile) */}
      <header className="hidden md:block sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Desktop Logo */}
            <a
              href="#inicio"
              id="nav-logo"
              className="flex items-center gap-2.5 group transition-transform hover:-translate-y-0.5 min-w-0"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-[#D2F832] border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center font-bold text-black text-lg sm:text-xl group-hover:rotate-6 transition-transform">
                ♀
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-gray-900 block leading-tight font-['Outfit'] truncate">
                  {settings.projectName}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold text-purple-700 tracking-wider uppercase block font-mono truncate">
                  Base de Registro & Extensão
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-bold text-gray-800 hover:text-purple-700 relative py-1 transition-colors group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#480988] transition-all duration-200 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Right Action Buttons - Desktop */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                id="nav-btn-admin"
                onClick={onOpenAdminModal}
                className="min-h-[44px] px-4 py-2 bg-[#D2F832] hover:bg-[#c6f028] text-black font-extrabold text-xs border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2"
                title="Painel do Administrador: Atualizar Etapas Concluídas"
              >
                <Settings className="w-4 h-4 text-black stroke-[2.5]" />
                <span>Painel do Administrador</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* MOBILE ONLY: FLOATING HAMBURGER BUTTON (NO TOP BAR)       */}
      {/* ========================================================= */}
      <div className="md:hidden fixed top-3.5 right-3.5 z-50">
        <button
          type="button"
          id="mobile-floating-menu-trigger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`w-11 h-11 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center transition-all active:translate-x-0.5 active:translate-y-0.5 ${
            mobileMenuOpen ? 'bg-[#D2F832] text-black rotate-90' : 'bg-white text-gray-900 hover:bg-gray-50'
          }`}
          aria-label={mobileMenuOpen ? "Fechar Menu de Opções" : "Abrir Menu de Opções"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
        </button>
      </div>

      {/* Floating Mobile Options Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-start justify-end p-3.5 pt-16 animate-in fade-in duration-150"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[280px] bg-white border-[3px] border-black rounded-2xl p-4 shadow-[6px_6px_0px_0px_#000] space-y-3 animate-in slide-in-from-top-4 duration-150"
          >
            <div className="flex items-center justify-between border-b-2 border-gray-100 pb-2.5">
              <div>
                <span className="font-extrabold text-sm text-gray-900 block font-['Outfit']">
                  Conectando Mulheres
                </span>
                <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-purple-700">
                  Menu & Navegação
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 border border-black flex items-center justify-center text-xs font-bold text-gray-700"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[40px] flex items-center px-3 py-2 text-sm font-extrabold text-gray-800 hover:bg-purple-50 rounded-xl font-['Outfit'] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="pt-2 border-t-2 border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminModal();
                }}
                className="w-full min-h-[44px] py-2.5 px-3 bg-[#D2F832] active:bg-[#c6f028] text-black font-black text-xs border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] flex items-center justify-center gap-2 font-['Outfit'] uppercase tracking-wider active:translate-x-0.5 active:translate-y-0.5"
              >
                <Settings className="w-4 h-4 text-black stroke-[2.5]" />
                <span>Painel do Administrador</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
