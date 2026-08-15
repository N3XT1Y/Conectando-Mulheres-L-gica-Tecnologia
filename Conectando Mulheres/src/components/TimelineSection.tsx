import React, { useState, useRef } from 'react';
import { useProjectData } from '../context/ProjectContext';
import { TimelineStep, StepStatus } from '../types';
import {
  CheckCircle2,
  Clock,
  RefreshCw,
  Lock,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Compass,
  Zap,
  Target,
  MessageSquare,
  Coins,
  Settings,
  Check,
  Award,
  LayoutGrid,
  FileText
} from 'lucide-react';

interface TimelineSectionProps {
  onSelectStep: (step: TimelineStep) => void;
}

// Color palette definitions matching the reference infographic
interface StepTheme {
  primary: string;
  glow: string;
  lightBg: string;
  border: string;
  badgeBg: string;
  badgeText: string;
  gradientText: string;
  shadowColor: string;
  iconBg: string;
}

// Helper to generate a smooth wave path (sinusoidal / cubic bezier wave) connecting all step totems dynamically
const generateSmoothWavePath = (count: number): string => {
  if (count <= 0) return "M 0 90 L 100 90";
  if (count === 1) return "M 0 90 L 100 90";
  
  const stepColWidth = 100;
  const firstTotemY = 55;
  
  // Start with a smooth entry curve from left edge (0) to first totem (50)
  let path = `M 0 ${firstTotemY} C 25 ${firstTotemY}, 25 ${firstTotemY}, 50 ${firstTotemY}`;
  
  for (let idx = 1; idx < count; idx++) {
    const prevX = (idx - 1) * stepColWidth + 50;
    const prevY = (idx - 1) % 2 === 0 ? 55 : 125;
    const currX = idx * stepColWidth + 50;
    const currY = idx % 2 === 0 ? 55 : 125;
    const dx = currX - prevX;
    
    // Smooth horizontal tangents at each totem vertex creating an organic wave profile
    const cpX1 = prevX + dx * 0.5;
    const cpY1 = prevY;
    const cpX2 = prevX + dx * 0.5;
    const cpY2 = currY;
    path += ` C ${cpX1.toFixed(1)} ${cpY1}, ${cpX2.toFixed(1)} ${cpY2}, ${currX.toFixed(1)} ${currY}`;
  }
  
  // Smooth exit curve from last totem to right edge
  const lastTotemY = (count - 1) % 2 === 0 ? 55 : 125;
  const lastTotemX = (count - 1) * stepColWidth + 50;
  const endX = count * stepColWidth;
  path += ` C ${(lastTotemX + 25).toFixed(1)} ${lastTotemY}, ${(lastTotemX + 25).toFixed(1)} ${lastTotemY}, ${endX} ${lastTotemY}`;
  
  return path;
};

const STEP_THEMES: Record<number, StepTheme> = {
  0: {
    // Step 01: Cyan / Aqua Blue (#00D2FF)
    primary: '#00B4D8',
    glow: 'rgba(0, 180, 216, 0.45)',
    lightBg: '#F0FAFF',
    border: '#0096C7',
    badgeBg: '#E0F7FE',
    badgeText: '#0077B6',
    gradientText: 'from-cyan-500 to-blue-600',
    shadowColor: '#0077B6',
    iconBg: '#CAF0F8'
  },
  1: {
    // Step 02: Indigo / Deep Purple (#4F46E5 / #38006B)
    primary: '#480988',
    glow: 'rgba(72, 9, 136, 0.45)',
    lightBg: '#FAF5FF',
    border: '#38006b',
    badgeBg: '#EDE9FE',
    badgeText: '#38006b',
    gradientText: 'from-indigo-600 to-purple-800',
    shadowColor: '#38006b',
    iconBg: '#E8DEFF'
  },
  2: {
    // Step 03: Vibrant Purple / Violet (#8B5CF6)
    primary: '#7C3AED',
    glow: 'rgba(124, 58, 237, 0.45)',
    lightBg: '#F5F3FF',
    border: '#6D28D9',
    badgeBg: '#EDE9FE',
    badgeText: '#5B21B6',
    gradientText: 'from-purple-500 to-violet-700',
    shadowColor: '#5B21B6',
    iconBg: '#DDD6FE'
  },
  3: {
    // Step 04: Radiant Pink / Magenta (#EC4899)
    primary: '#DB2777',
    glow: 'rgba(219, 39, 119, 0.45)',
    lightBg: '#FDF2F8',
    border: '#BE185D',
    badgeBg: '#FCE7F3',
    badgeText: '#9D174D',
    gradientText: 'from-pink-500 to-rose-600',
    shadowColor: '#9D174D',
    iconBg: '#FBCFE8'
  },
  4: {
    // Step 05: Neon Lime / Emerald (#10B981 / #D2F832)
    primary: '#059669',
    glow: 'rgba(16, 185, 129, 0.45)',
    lightBg: '#ECFDF5',
    border: '#047857',
    badgeBg: '#D1FAE5',
    badgeText: '#065F46',
    gradientText: 'from-emerald-500 to-teal-700',
    shadowColor: '#065F46',
    iconBg: '#A7F3D0'
  }
};

export const TimelineSection: React.FC<TimelineSectionProps> = ({ onSelectStep }) => {
  const { steps } = useProjectData();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'board' | 'cards'>('board');
  const [previewStep, setPreviewStep] = useState<TimelineStep | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredSteps = filterStatus === 'all'
    ? steps
    : steps.filter(s => s.status === filterStatus);

  // Gamification progress statistics
  const totalSteps = steps.length;
  const completedCount = steps.filter(s => s.status === 'concluido').length;
  const inProgressIndex = steps.findIndex(s => s.status === 'em_andamento');
  const progressPercentage = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const getTheme = (index: number): StepTheme => {
    return STEP_THEMES[index % Object.keys(STEP_THEMES).length];
  };

  const handleTileClick = (step: TimelineStep, e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewStep(step);
  };

  const getStepIcon = (iconType: string, index: number) => {
    const theme = getTheme(index);
    switch (iconType) {
      case 'robot':
        return <Target className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: theme.primary }} />;
      case 'bracelet':
        return <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: theme.primary }} />;
      case 'cards':
        return <Coins className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: theme.primary }} />;
      case 'flowchart':
        return <Settings className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: theme.primary }} />;
      default:
        return <Check className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: theme.primary }} />;
    }
  };

  const getStatusBadge = (status: StepStatus, compact = false) => {
    switch (status) {
      case 'concluido':
        return (
          <span className={`inline-flex items-center gap-1 bg-[#D2F832] text-black font-extrabold ${compact ? 'text-[10px] px-2 py-0.5' : 'text-[11px] sm:text-xs px-2.5 sm:px-3 py-1'} rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] uppercase font-mono whitespace-nowrap`}>
            <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
            <span>{compact ? 'Concluído' : 'Fase Concluída'}</span>
          </span>
        );
      case 'em_andamento':
        return (
          <span className={`inline-flex items-center gap-1 bg-[#480988] text-white font-extrabold ${compact ? 'text-[10px] px-2 py-0.5' : 'text-[11px] sm:text-xs px-2.5 sm:px-3 py-1'} rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] uppercase font-mono whitespace-nowrap animate-pulse`}>
            <RefreshCw className="w-3 h-3 animate-spin duration-3000" />
            <span>{compact ? 'Atual' : 'Fase Atual'}</span>
          </span>
        );
      case 'planejado':
        return (
          <span className={`inline-flex items-center gap-1 bg-gray-100 text-gray-800 font-extrabold ${compact ? 'text-[10px] px-2 py-0.5' : 'text-[11px] sm:text-xs px-2.5 sm:px-3 py-1'} rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] uppercase font-mono whitespace-nowrap`}>
            <Clock className="w-3 h-3 text-gray-600" />
            <span>{compact ? 'Próxima' : 'Próxima Fase'}</span>
          </span>
        );
      case 'bloqueado':
        return (
          <span className={`inline-flex items-center gap-1 bg-gray-200 text-gray-500 font-extrabold ${compact ? 'text-[10px] px-2 py-0.5' : 'text-[11px] sm:text-xs px-2.5 sm:px-3 py-1'} rounded-lg border-2 border-black uppercase font-mono whitespace-nowrap`}>
            <Lock className="w-3 h-3" />
            <span>{compact ? 'Bloq.' : 'Bloqueada'}</span>
          </span>
        );
    }
  };

  return (
    <section id="jornada" className="py-10 sm:py-16 px-3.5 sm:px-6 lg:px-8 bg-[#FBFBFE] border-y-[2.5px] sm:border-y-[3px] border-black relative overflow-hidden">
      
      {/* Subtle Gamified Grid Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* SECTION HEADER: Gamified Title & Info matching reference typography */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 bg-[#D2F832] text-black border-2 border-black text-[11px] sm:text-xs font-mono font-black uppercase px-2.5 py-0.5 rounded-md shadow-[2px_2px_0px_0px_#000]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Trilha de Aprendizado & Registro</span>
              </span>
              <span className="text-xs font-mono font-bold text-purple-900 hidden sm:inline">
                • Linha do tempo visual das etapas da extensão
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-950 uppercase font-['Outfit']">
              NOSSA JORNADA: PASSO A PASSO
            </h2>
            <div className="w-24 sm:w-36 h-2 bg-[#D2F832] mt-1.5 rounded-full border-2 border-black"></div>
            
            <p className="text-xs sm:text-base text-gray-600 font-medium mt-3 max-w-2xl">
              Cada oficina é uma <strong>etapa documentada da trilha</strong>. Acompanhe a evolução pedagógica das participantes através dos conceitos de algoritmos, repetições, abstrações e lógica desplugada.
            </p>
          </div>

          {/* PROGRESS DASHBOARD & CONTROLS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 self-start lg:self-auto w-full lg:w-auto">
            
            {/* Progress Summary Card */}
            <div className="bg-white border-2 border-black rounded-2xl p-3 sm:p-3.5 shadow-[3px_3px_0px_0px_#000] flex items-center gap-3 sm:gap-4 shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#480988] text-white border-2 border-black flex items-center justify-center font-mono font-black text-sm sm:text-base shadow-[2px_2px_0px_0px_#000] shrink-0">
                ★
              </div>
              <div className="min-w-[130px] sm:min-w-[150px]">
                <div className="flex justify-between items-center text-[10px] sm:text-xs font-mono font-bold mb-1">
                  <span className="text-purple-950">Etapas Concluídas</span>
                  <span className="text-[#480988] bg-[#E8DEFF] px-1.5 py-0.2 rounded font-black">
                    {completedCount}/{totalSteps} Fases
                  </span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full border border-black overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#00D2FF] via-[#7C3AED] to-[#D2F832] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* View Mode & Filter Toggles */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-100 p-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] text-xs font-bold font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode('board')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === 'board' ? 'bg-[#38006b] text-white shadow-xs' : 'text-gray-700 hover:text-black'
                  }`}
                  title="Visualização em Trilha Linear (Estilo Tabuleiro)"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Trilha</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                    viewMode === 'cards' ? 'bg-[#38006b] text-white shadow-xs' : 'text-gray-700 hover:text-black'
                  }`}
                  title="Visualização em Grade de Cards"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Cards</span>
                </button>
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white border-2 border-black rounded-xl px-3 py-2 text-xs font-bold font-mono shadow-[2px_2px_0px_0px_#000] cursor-pointer min-h-[40px]"
              >
                <option value="all">Todas as Fases ({steps.length})</option>
                <option value="concluido">🟢 Concluídas</option>
                <option value="em_andamento">🟣 Em Andamento</option>
                <option value="planejado">⚪ Planejadas</option>
              </select>

              {/* Navigation Arrows for Board Scroll */}
              <div className="hidden lg:flex items-center gap-1.5 ml-1">
                <button
                  type="button"
                  onClick={() => scroll('left')}
                  className="w-10 h-10 bg-white hover:bg-gray-100 text-gray-900 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  aria-label="Rolar para a esquerda"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button
                  type="button"
                  onClick={() => scroll('right')}
                  className="w-10 h-10 bg-[#D2F832] hover:bg-[#c6f028] text-black border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] flex items-center justify-center active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  aria-label="Rolar para a direita"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* ========================================================= */}
        {/* VIEW MODE 1: GAMIFIED ISOMETRIC BOARD TRAIL (TABULEIRO) */}
        {/* Redimensionado de forma compacta e sem rolagem vertical   */}
        {/* ========================================================= */}
        {viewMode === 'board' && (
          <div className="relative">
            
            {/* Horizontal Scrollable Board Trail (No Vertical Scrollbar) */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto overflow-y-hidden pb-6 pt-3 px-2 custom-scrollbar scroll-smooth"
            >
              <div className="min-w-[840px] lg:min-w-[1050px] relative py-4">
                
                {/* SVG CONNECTING PATH (Smooth Undulating Wave Trail) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-0"
                  preserveAspectRatio="none"
                  viewBox={`0 0 ${Math.max(filteredSteps.length, 1) * 100} 190`}
                >
                  <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.85" />
                      <stop offset="25%" stopColor="#480988" stopOpacity="0.85" />
                      <stop offset="50%" stopColor="#7C3AED" stopOpacity="0.85" />
                      <stop offset="75%" stopColor="#DB2777" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.85" />
                    </linearGradient>
                    <filter id="pathShadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.12" />
                    </filter>
                  </defs>

                  {/* Wide background pipe/circuit trail with wave profile */}
                  <path
                    d={generateSmoothWavePath(filteredSteps.length)}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#pathShadow)"
                  />

                  {/* Active Gradient Rounded Wave Track with dashed pulse */}
                  <path
                    d={generateSmoothWavePath(filteredSteps.length)}
                    fill="none"
                    stroke="url(#pathGradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="10 7"
                  />
                </svg>

                {/* THE COMPACT TILES GRID (ZIGZAG POSITIONS) */}
                <div
                  className="grid relative z-10 gap-3"
                  style={{
                    gridTemplateColumns: `repeat(${Math.max(filteredSteps.length, 1)}, minmax(180px, 1fr))`
                  }}
                >
                  {filteredSteps.map((step, idx) => {
                    const theme = getTheme(idx);
                    const isEven = idx % 2 === 0; // Even: High, Odd: Low
                    const isCurrent = step.status === 'em_andamento';
                    const isDone = step.status === 'concluido';
                    const isSelected = previewStep?.id === step.id;

                    return (
                      <div
                        key={step.id}
                        className="flex flex-col items-center relative group"
                      >
                        {/* ======================================================== */}
                        {/* COMPACT ISOMETRIC 3D FLOATING TILE ("TOTEM DA FASE")     */}
                        {/* ======================================================== */}
                        <div
                          className={`relative flex flex-col items-center transition-all duration-200 cursor-pointer ${
                            isEven ? 'mb-1' : 'mt-10 mb-1'
                          } ${isSelected ? '-translate-y-1.5 scale-105' : 'hover:-translate-y-1'}`}
                          onClick={(e) => handleTileClick(step, e)}
                        >
                          {/* Slanted Step Number floating above (01, 02, 03...) */}
                          <div
                            className="text-xl sm:text-2xl font-black italic tracking-tighter mb-0.5 select-none font-mono transition-transform group-hover:scale-110"
                            style={{
                              color: theme.primary,
                              transform: 'skewX(-10deg)',
                              textShadow: `1px 1px 0px #000, 2px 2px 0px rgba(0,0,0,0.12)`
                            }}
                          >
                            {step.stepNumber}
                          </div>

                          {/* "YOU ARE HERE" GAMIFIED BEACON (FOR ACTIVE STEP) */}
                          {isCurrent && (
                            <div className="absolute -top-6 z-20 flex flex-col items-center animate-bounce">
                              <span className="bg-[#480988] text-[#D2F832] text-[9px] font-mono font-black px-1.5 py-0.2 rounded-full border-1.5 border-black shadow-[1.5px_1.5px_0px_0px_#000] whitespace-nowrap flex items-center gap-1">
                                <Zap className="w-2.5 h-2.5 fill-[#D2F832]" />
                                ATUAL
                              </span>
                              <div className="w-1.5 h-1.5 bg-[#480988] rotate-45 -mt-1 border-r border-b border-black"></div>
                            </div>
                          )}

                          {/* COMPLETED STAR/CHECK BADGE */}
                          {isDone && (
                            <div className="absolute -top-2 -right-1.5 z-20 w-5 h-5 rounded-full bg-[#D2F832] border-1.5 border-black shadow-[1.5px_1.5px_0px_0px_#000] flex items-center justify-center text-[10px] font-bold">
                              ✓
                            </div>
                          )}

                          {/* ISOMETRIC TILE PLATFORM CONTAINER */}
                          <div className="relative p-1.5">
                            
                            {/* Colorful Glow underneath tile */}
                            <div
                              className="absolute inset-x-1.5 bottom-0 h-6 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"
                              style={{
                                backgroundColor: theme.glow,
                                transform: 'scale(1.1) translateY(4px)'
                              }}
                            />

                            {/* 3D Isometric Diamond Block - Compact Size */}
                            <div
                              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-black transition-all duration-200 flex items-center justify-center overflow-hidden"
                              style={{
                                boxShadow: isSelected
                                  ? `0 10px 20px -3px ${theme.glow}, 3px 5px 0px 0px #000`
                                  : `0 8px 16px -4px ${theme.glow}, 3px 4px 0px 0px #000`,
                                transform: isSelected
                                  ? 'perspective(400px) rotateX(15deg) scale(1.04)'
                                  : 'perspective(400px) rotateX(20deg)',
                                transformStyle: 'preserve-3d'
                              }}
                            >
                              {/* Top Bevel Highlight */}
                              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
                              
                              {/* Inner Glow Circle with step icon */}
                              <div
                                className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl border-1.5 border-black/80 flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-200"
                                style={{ backgroundColor: theme.iconBg }}
                              >
                                {getStepIcon(step.iconType, idx)}
                              </div>

                              {/* Corner Step ID indicator */}
                              <div
                                className="absolute bottom-0.5 right-1.5 text-[8px] font-mono font-extrabold uppercase opacity-60"
                                style={{ color: theme.primary }}
                              >
                                F.{step.stepNumber}
                              </div>
                            </div>

                          </div>

                          {/* Status Pill beneath the platform */}
                          <div className="mt-1">
                            {getStatusBadge(step.status, true)}
                          </div>
                        </div>

                        {/* ======================================================== */}
                        {/* CLEAN TITLE & CONCEPT LABEL                              */}
                        {/* ======================================================== */}
                        <div
                          className="text-center px-1 cursor-pointer mt-1 max-w-[170px]"
                          onClick={(e) => handleTileClick(step, e)}
                        >
                          <span
                            className="text-[11px] sm:text-xs font-black uppercase tracking-wide block font-['Outfit'] truncate"
                            style={{ color: theme.primary }}
                          >
                            {step.logicalConcept}
                          </span>
                          <h4 className="text-[11px] font-bold text-gray-800 line-clamp-1 mt-0.5">
                            {step.title}
                          </h4>
                          <span className="text-[9px] text-gray-500 font-mono block mt-0.5 bg-gray-100 px-1.5 py-0.2 rounded border border-gray-200">
                            Clique para detalhes 👆
                          </span>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

            {/* Instruction banner beneath board */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-500 px-2 pt-2 border-t border-gray-200/80 mt-1">
              <span className="flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-purple-700" />
                <span>Clique em qualquer totem para abrir o card centralizado com os detalhes da fase</span>
              </span>
              <span className="hidden sm:inline text-purple-900 bg-[#E8DEFF] px-2.5 py-0.5 rounded-full border border-black text-[11px]">
                Trilha Conectando Mulheres
              </span>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* CENTERED SCREEN PREVIEW CARD MODAL (MOBILE ADAPTED)       */}
        {/* Card flutuante redimensionado e otimizado para mobile     */}
        {/* ========================================================= */}
        {previewStep && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
            onClick={() => setPreviewStep(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white border-[2.5px] sm:border-[3px] border-black rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-[5px_5px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] w-full max-w-[340px] sm:max-w-md md:max-w-lg relative animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto flex flex-col justify-between my-auto custom-scrollbar"
              style={{
                borderTop: `5px sm:borderTop: 6px solid ${getTheme(steps.findIndex(s => s.id === previewStep.id) >= 0 ? steps.findIndex(s => s.id === previewStep.id) : 0).primary}`
              }}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setPreviewStep(null)}
                className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 hover:bg-gray-200 border-2 border-black text-xs sm:text-sm font-bold flex items-center justify-center text-gray-800 shadow-[1px_1px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                title="Fechar"
                aria-label="Fechar card de informações"
              >
                ✕
              </button>

              <div>
                {/* Header & Badges */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 pr-7 flex-wrap">
                  <span className="bg-[#38006b] text-white font-mono font-black text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md border border-black shadow-[1px_1px_0px_0px_#000]">
                    FASE {previewStep.stepNumber}
                  </span>
                  {getStatusBadge(previewStep.status, true)}
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded border border-black">
                    {previewStep.weekRange}
                  </span>
                </div>

                {/* Concept & Title */}
                <div className="mb-2 sm:mb-3">
                  <span
                    className="text-[10px] sm:text-xs font-mono font-black uppercase tracking-wider block"
                    style={{ color: getTheme(steps.findIndex(s => s.id === previewStep.id) >= 0 ? steps.findIndex(s => s.id === previewStep.id) : 0).primary }}
                  >
                    {previewStep.logicalConcept}
                  </span>
                  <h3 className="text-sm sm:text-lg font-black text-gray-950 font-['Outfit'] uppercase leading-snug">
                    {previewStep.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs font-bold text-purple-900 mt-0.5">
                    {previewStep.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed mb-3 bg-[#FAF8FF] p-2.5 sm:p-3 rounded-xl border border-purple-200">
                  {previewStep.activityDescription}
                </p>

                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-3 text-[11px] sm:text-xs font-mono font-bold">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    <span className="truncate">Dinâmica Desplugada</span>
                  </div>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl p-2 sm:p-2.5 flex items-center gap-1.5 text-purple-900">
                    <Camera className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                    <span className="truncate">{previewStep.media?.gallery?.length || 1} fotos</span>
                  </div>
                </div>

                {/* Pedagogical Materials Preview if available */}
                {previewStep.pedagogicalMaterials && previewStep.pedagogicalMaterials.length > 0 && (
                  <div className="mb-3">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-gray-500 uppercase block mb-1">
                      Materiais Tangíveis:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {previewStep.pedagogicalMaterials.slice(0, 3).map((m, i) => (
                        <span key={i} className="text-[10px] sm:text-[11px] font-medium bg-white text-gray-800 px-1.5 py-0.5 rounded border border-gray-300">
                          • {m}
                        </span>
                      ))}
                      {previewStep.pedagogicalMaterials.length > 3 && (
                        <span className="text-[10px] sm:text-[11px] font-medium text-gray-500 px-1 py-0.5">
                          +{previewStep.pedagogicalMaterials.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t-2 border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const stepToOpen = previewStep;
                    setPreviewStep(null);
                    onSelectStep(stepToOpen);
                  }}
                  className="w-full sm:flex-1 min-h-[40px] sm:min-h-[44px] font-mono font-black text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-1.5 bg-[#D2F832] hover:bg-[#c8f024] text-black"
                >
                  <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate">Ver Registro & Fotos</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => setPreviewStep(null)}
                  className="min-h-[38px] sm:min-h-[44px] px-3 sm:px-4 py-1.5 sm:py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs sm:text-sm rounded-xl border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 text-center"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW MODE 2: RESPONSIVE CARDS GRID (ALTERNATIVE VIEW)     */}
        {/* ========================================================= */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredSteps.map((step, idx) => {
              const theme = getTheme(idx);
              return (
                <div
                  key={step.id}
                  onClick={() => onSelectStep(step)}
                  className="bg-white border-[2.5px] border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Media or Illustration */}
                  <div
                    className="h-44 border-b-2 border-black flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: theme.lightBg }}
                  >
                    <div className="absolute top-2 left-2 bg-[#38006b] text-white font-mono font-black text-xs px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_0px_#000] z-10">
                      FASE {step.stepNumber}
                    </div>

                    {step.media?.url ? (
                      <div className="w-full h-full relative">
                        <img
                          src={step.media.url}
                          alt={step.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-3 right-3 text-white text-[11px] font-medium truncate">
                          📸 {step.media.caption || 'Registro da Oficina'}
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-16 h-16 rounded-2xl border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000]"
                        style={{ backgroundColor: theme.iconBg }}
                      >
                        {getStepIcon(step.iconType, idx)}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
                    <div>
                      <span
                        className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider block mb-1"
                        style={{ color: theme.primary }}
                      >
                        {step.logicalConcept}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-gray-950 font-['Outfit'] uppercase leading-tight mb-2 group-hover:text-purple-800 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-600 font-medium line-clamp-3 leading-relaxed">
                        {step.activityDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t-2 border-gray-100 flex items-center justify-between">
                      {getStatusBadge(step.status)}
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-900 group-hover:text-purple-900">
                        <span>Ver Fase</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
