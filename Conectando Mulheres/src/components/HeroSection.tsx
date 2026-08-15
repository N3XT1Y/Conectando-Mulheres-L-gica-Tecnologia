import React from 'react';
import { useProjectData } from '../context/ProjectContext';
import { BookOpen, Terminal, Code2, Lightbulb, Compass } from 'lucide-react';

interface HeroSectionProps {
  onExploreTimeline: () => void;
  onExploreAbout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreTimeline, onExploreAbout }) => {
  const { settings, globalProgressPercentage, completedStepsCount, totalStepsCount } = useProjectData();

  return (
    <section id="inicio" className="pt-2 sm:pt-8 pb-6 sm:pb-12 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Hero Neo-Brutal Card */}
        <div className="relative bg-[#E8DEFF] border-[2.5px] border-black rounded-2xl sm:rounded-[32px] p-4 sm:p-8 lg:p-12 shadow-[4px_4px_0px_0px_#000] sm:shadow-[7px_7px_0px_0px_#000] overflow-hidden">
          
          {/* Top Right Decorative Lime Circle - Desktop / Tablet only */}
          <div className="hidden sm:block absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-14 sm:h-14 bg-[#D2F832] border-[2px] sm:border-[2.5px] border-black rounded-full shadow-[2px_2px_0px_0px_#000] z-10 animate-bounce duration-1000"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center">
            
            {/* Left Content Column (Full width on mobile, 7 cols on desktop) */}
            <div className="w-full lg:col-span-7 flex flex-col justify-between space-y-3.5 sm:space-y-6 z-10">
              
              {/* Institution / Community Tag */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 self-start bg-white border-2 border-black px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] text-[10px] sm:text-xs font-bold text-gray-900">
                <span className="w-2 h-2 rounded-full bg-[#480988] animate-pulse shrink-0"></span>
                <span className="truncate">{settings.institutionName} • {settings.communityName}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-950 uppercase leading-[1.15] sm:leading-[1.08] font-['Outfit']">
                {settings.impactHeadline}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-xs sm:text-base lg:text-lg text-gray-800 font-medium leading-relaxed max-w-2xl">
                {settings.description}
              </p>

              {/* Global Progress Bar */}
              <div className="bg-white/85 backdrop-blur-xs border-2 border-black rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-[2.5px_2.5px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] max-w-xl">
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-sm font-extrabold text-gray-900 uppercase tracking-wider font-mono">
                    Progresso Geral das Etapas
                  </span>
                  <span className="text-base sm:text-2xl font-black text-[#480988] font-mono">
                    {globalProgressPercentage}%
                  </span>
                </div>

                {/* Neo-brutalist Progress Track */}
                <div className="relative w-full h-6 sm:h-8 bg-white border-2 border-black rounded-md overflow-hidden p-0.5 shadow-[inset_0px_2px_4px_rgba(0,0,0,0.08)]">
                  <div
                    className="h-full bg-[#D2F832] border-r-2 border-black transition-all duration-700 ease-out flex items-center justify-end pr-2"
                    style={{ width: `${Math.max(10, Math.min(100, globalProgressPercentage))}%` }}
                  >
                  </div>
                  {/* Centered text overlay inside bar */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-1">
                    <span className="text-[9px] sm:text-xs font-black tracking-wider sm:tracking-widest text-black uppercase font-mono px-1 sm:px-2 bg-white/70 rounded truncate">
                      RELATÓRIO: {completedStepsCount}/{totalStepsCount} ETAPAS EXECUTADAS
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[9px] sm:text-[11px] font-bold text-gray-600 mt-1.5 sm:mt-2 font-mono">
                  <span>Início do Projeto</span>
                  <span>Documentação Contínua</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
                <div className="relative block sm:inline-block group w-full sm:w-auto">
                  {/* Decorative background tilted rectangle */}
                  <div className="hidden sm:block absolute -inset-0.5 sm:-inset-1 bg-[#D8CCFF] border-2 border-black rounded-xl -rotate-1 sm:-rotate-2 group-hover:rotate-0 transition-transform"></div>
                  
                  {/* Primary Button: View Timeline Records */}
                  <button
                    type="button"
                    id="hero-btn-timeline"
                    onClick={onExploreTimeline}
                    className="relative w-full sm:w-auto min-h-[44px] sm:min-h-[48px] px-5 sm:px-7 py-2.5 sm:py-3.5 bg-[#38006b] hover:bg-[#480988] text-white font-extrabold text-xs sm:text-base border-2 border-black rounded-xl shadow-[2.5px_2.5px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 uppercase tracking-wide font-['Outfit']"
                  >
                    <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#D2F832]" />
                    <span>Ver Linha do Tempo & Registros</span>
                  </button>
                </div>

                <button
                  type="button"
                  id="hero-btn-about"
                  onClick={onExploreAbout}
                  className="min-h-[44px] sm:min-h-[48px] px-4 sm:px-6 py-2.5 sm:py-3.5 bg-white hover:bg-gray-50 text-gray-900 font-extrabold text-xs sm:text-base border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 font-['Outfit'] w-full sm:w-auto"
                >
                  <BookOpen className="w-4 h-4 text-purple-800" />
                  <span>Sobre a Metodologia</span>
                </button>
              </div>

            </div>

            {/* Right Illustration Window Card - ONLY ON DESKTOPS (lg:block) */}
            <div className="hidden lg:block lg:col-span-5 relative mt-2 lg:mt-0">
              <div className="bg-white border-[2.5px] border-black rounded-2xl p-3.5 sm:p-5 shadow-[4px_4px_0px_0px_#000] sm:shadow-[6px_6px_0px_0px_#000] overflow-hidden">
                
                {/* Window Header */}
                <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b-2 border-black">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-400 border border-black inline-block"></span>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-300 border border-black inline-block"></span>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400 border border-black inline-block"></span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-gray-800 font-mono truncate px-1">
                    Conectando Mulheres
                  </span>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Code2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Tech & Community Illustration Graphic */}
                <div className="relative bg-[#FAF8FF] border-2 border-black rounded-xl p-3 sm:p-4 min-h-[240px] sm:min-h-[280px] flex flex-col justify-between overflow-hidden">
                  
                  {/* Floating Unplugged Nodes */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="bg-[#D2F832] border-2 border-black px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-bold font-mono shadow-[2px_2px_0px_0px_#000] flex items-center gap-1">
                      <Terminal className="w-3 h-3" />
                      <span>{'{ } 01101'}</span>
                    </div>

                    <div className="bg-purple-100 border-2 border-black px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-bold text-purple-900 font-mono shadow-[2px_2px_0px_0px_#000]">
                      BASE DE REGISTRO
                    </div>
                  </div>

                  {/* Center Hero Artwork / Metaphor */}
                  <div className="my-2 sm:my-3 flex items-center justify-center relative">
                    <svg viewBox="0 0 400 240" className="w-full h-auto max-h-[160px] sm:max-h-[190px]">
                      {/* Background connected nodes */}
                      <g stroke="#D1C4E9" strokeWidth="2" strokeDasharray="4 4">
                        <line x1="60" y1="60" x2="160" y2="40" />
                        <line x1="160" y1="40" x2="260" y2="70" />
                        <line x1="260" y1="70" x2="340" y2="50" />
                        <line x1="60" y1="60" x2="120" y2="150" />
                        <line x1="120" y1="150" x2="220" y2="170" />
                        <line x1="220" y1="170" x2="320" y2="140" />
                        <line x1="160" y1="40" x2="220" y2="170" />
                      </g>

                      {/* Node Circles */}
                      <circle cx="60" cy="60" r="14" fill="#D2F832" stroke="#000" strokeWidth="2" />
                      <text x="60" y="64" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="monospace">IF</text>

                      <circle cx="160" cy="40" r="16" fill="#EDE7F6" stroke="#000" strokeWidth="2" />
                      <text x="160" y="44" textAnchor="middle" fontSize="11" fontWeight="bold" fontFamily="monospace">FOR</text>

                      <circle cx="260" cy="70" r="15" fill="#D2F832" stroke="#000" strokeWidth="2" />
                      <text x="260" y="74" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="monospace">DO</text>

                      <circle cx="340" cy="50" r="14" fill="#EDE7F6" stroke="#000" strokeWidth="2" />
                      <text x="340" y="54" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="monospace">END</text>

                      {/* Main Illustrated Characters Card */}
                      <rect x="80" y="70" width="240" height="140" rx="16" fill="#FFFFFF" stroke="#000" strokeWidth="2.5" />
                      
                      {/* Character 1 (Teacher/Facilitator with purple hair) */}
                      <g transform="translate(105, 85)">
                        <circle cx="25" cy="20" r="16" fill="#E8DEFF" stroke="#000" strokeWidth="2" />
                        <path d="M 12 16 Q 25 2 38 16" fill="#480988" stroke="#000" strokeWidth="1.5" />
                        <path d="M 10 48 Q 25 36 40 48 L 42 65 L 8 65 Z" fill="#D2F832" stroke="#000" strokeWidth="2" />
                        <circle cx="20" cy="18" r="2" fill="#000" />
                        <circle cx="30" cy="18" r="2" fill="#000" />
                        <path d="M 22 26 Q 25 29 28 26" stroke="#000" strokeWidth="1.5" fill="none" />
                        <path d="M 40 50 L 58 35" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="60" cy="33" r="4" fill="#E8DEFF" stroke="#000" strokeWidth="1.5" />
                      </g>

                      {/* Center Logic Card between them */}
                      <g transform="translate(185, 95)">
                        <rect x="0" y="0" width="40" height="50" rx="6" fill="#480988" stroke="#000" strokeWidth="2" />
                        <text x="20" y="20" fill="#D2F832" textAnchor="middle" fontSize="12" fontWeight="bold" fontFamily="monospace">{'< / >'}</text>
                        <line x1="8" y1="28" x2="32" y2="28" stroke="#FFF" strokeWidth="1.5" />
                        <line x1="8" y1="34" x2="26" y2="34" stroke="#FFF" strokeWidth="1.5" />
                        <line x1="8" y1="40" x2="30" y2="40" stroke="#FFF" strokeWidth="1.5" />
                      </g>

                      {/* Character 2 (Community Participant with curly lilac hair) */}
                      <g transform="translate(240, 85)">
                        <circle cx="25" cy="20" r="16" fill="#FFF2E2" stroke="#000" strokeWidth="2" />
                        <path d="M 8 16 Q 25 -2 42 16 Q 44 26 38 32 Q 12 32 6 22 Z" fill="#9D4EDD" stroke="#000" strokeWidth="1.5" />
                        <path d="M 10 48 Q 25 36 40 48 L 42 65 L 8 65 Z" fill="#FFFFFF" stroke="#000" strokeWidth="2" />
                        <circle cx="20" cy="18" r="2" fill="#000" />
                        <circle cx="30" cy="18" r="2" fill="#000" />
                        <path d="M 21 25 Q 25 28 29 25" stroke="#000" strokeWidth="1.5" fill="none" />
                        <rect x="-8" y="44" width="22" height="16" rx="3" fill="#D2F832" stroke="#000" strokeWidth="1.5" />
                      </g>

                      <text x="110" y="195" fontSize="14" fill="#480988">✦</text>
                      <text x="280" y="190" fontSize="14" fill="#D2F832">★</text>
                      <text x="195" y="165" fontSize="10" fontWeight="bold" fill="#333" fontFamily="monospace">ROBÔ CEGO</text>
                    </svg>
                  </div>

                  {/* Bottom Metaphor Tag */}
                  <div className="flex items-center justify-between text-[11px] sm:text-xs bg-white border-2 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_#000]">
                    <div className="flex items-center gap-1.5 font-bold text-gray-800">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">Sem computadores: lógica tangível</span>
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-mono text-purple-700 font-bold shrink-0">100% Prático</span>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
