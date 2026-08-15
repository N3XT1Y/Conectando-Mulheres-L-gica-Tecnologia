import React, { useState } from 'react';
import { TimelineStep, StepStatus } from '../types';
import { useProjectData } from '../context/ProjectContext';
import {
  X,
  Layers,
  Quote,
  Camera,
  FileText,
  Tag
} from 'lucide-react';

interface StepDetailModalProps {
  step: TimelineStep | null;
  onClose: () => void;
}

export const StepDetailModal: React.FC<StepDetailModalProps> = ({ step, onClose }) => {
  const { setStepStatus } = useProjectData();
  const [activeTab, setActiveTab] = useState<'info' | 'gallery'>('info');

  if (!step) return null;

  const handleStatusChange = (newStatus: StepStatus) => {
    setStepStatus(step.id, newStatus);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-4xl bg-white border-[2.5px] sm:border-[3px] border-black rounded-2xl sm:rounded-3xl shadow-[5px_5px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="bg-[#E8DEFF] border-b-[2.5px] border-black p-3.5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-[#38006b] text-white border-2 border-black flex items-center justify-center font-mono font-black text-sm sm:text-lg shadow-[2px_2px_0px_0px_#000] shrink-0">
              {step.stepNumber}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-purple-900 uppercase truncate">
                  {step.weekRange} • {step.dateRange}
                </span>
              </div>
              <h3 className="text-base sm:text-2xl font-black text-gray-950 font-['Outfit'] truncate">
                {step.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white hover:bg-rose-100 text-gray-900 border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center transition-transform hover:rotate-90 shrink-0 ml-2"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Navigation Tabs & Status Selector */}
        <div className="bg-gray-50 border-b-2 border-black px-2.5 sm:px-5 py-2 sm:py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 shrink-0">
          {/* Navigation Tabs (Grid on mobile, flex on desktop) */}
          <div className={`grid ${step.media?.gallery && step.media.gallery.length > 0 ? 'grid-cols-2' : 'grid-cols-1'} sm:flex sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto`}>
            <button
              type="button"
              onClick={() => setActiveTab('info')}
              className={`min-h-[38px] px-2 sm:px-4 py-1.5 rounded-lg border-2 border-black font-bold text-[11px] sm:text-xs shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-center ${
                activeTab === 'info' ? 'bg-[#D2F832] text-black' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0 hidden xs:inline" />
              <span className="truncate">Registro & Metodologia</span>
            </button>

            {step.media?.gallery && step.media.gallery.length > 0 && (
              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`min-h-[38px] px-2 sm:px-4 py-1.5 rounded-lg border-2 border-black font-bold text-[11px] sm:text-xs shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-center ${
                  activeTab === 'gallery' ? 'bg-[#D2F832] text-black' : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Camera className="w-3.5 h-3.5 shrink-0 hidden xs:inline" />
                <span className="truncate">Evidências ({step.media.gallery.length})</span>
              </button>
            )}
          </div>

          {/* Quick Status Indicator / Toggle */}
          <div className="flex items-center justify-between sm:justify-end gap-1.5 text-[11px] sm:text-xs font-mono font-bold">
            <span className="text-gray-600 sm:text-gray-500">Status da Etapa:</span>
            <select
              value={step.status}
              onChange={(e) => handleStatusChange(e.target.value as StepStatus)}
              className="bg-white border-2 border-black rounded-lg px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold font-mono shadow-[1.5px_1.5px_0px_0px_#000] cursor-pointer min-h-[36px]"
            >
              <option value="concluido">🟢 Concluído</option>
              <option value="em_andamento">🟣 Em Andamento</option>
              <option value="planejado">⚪ Planejado</option>
              <option value="bloqueado">🔒 Bloqueado</option>
            </select>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-3 sm:p-6 overflow-y-auto overflow-x-hidden flex-1 space-y-3.5 sm:space-y-6">
          
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-base sm:text-lg text-gray-900 font-['Outfit']">
                  Registros Fotográficos da Oficina Presencial
                </h4>
                <span className="text-xs font-mono font-bold text-purple-700">
                  {step.media?.gallery?.length || 0} fotos arquivadas
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {step.media?.gallery?.map((img, i) => (
                  <div key={i} className="bg-white border-2 border-black rounded-xl p-2.5 shadow-[3px_3px_0px_0px_#000] overflow-hidden flex flex-col justify-between">
                    <img
                      src={img.url}
                      alt={img.caption}
                      referrerPolicy="no-referrer"
                      className="w-full h-44 sm:h-52 object-cover rounded-lg border border-black mb-2.5"
                    />
                    <p className="text-xs text-gray-800 font-medium px-1 leading-snug">
                      📸 {img.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-4 sm:space-y-6">
              
              {/* Featured photo banner if exists */}
              {step.media?.url && (
                <div className="relative border-2 border-black rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_#000] max-h-64">
                  <img
                    src={step.media.url}
                    alt={step.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                    <span className="text-white text-xs sm:text-sm font-semibold">
                      📸 {step.media.caption || 'Registro prático da oficina'}
                    </span>
                  </div>
                </div>
              )}

              {/* Concept & Objective Banner */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-[#FAF8FF] border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_0px_#000]">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-purple-800 uppercase block mb-1">
                    Conceito Lógico / Pilar Acadêmico
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-2">
                    {step.logicalConcept}
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    {step.logicalObjective}
                  </p>
                </div>

                <div className="bg-[#F8FDF0] border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_0px_#000]">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-emerald-800 uppercase block mb-1">
                    Dinâmica Desplugada Desenvolvida
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-gray-900 mb-2">
                    {step.subtitle}
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    {step.activityDescription}
                  </p>
                </div>
              </div>

              {/* Pedagogical Materials */}
              {step.pedagogicalMaterials && step.pedagogicalMaterials.length > 0 && (
                <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-[3px_3px_0px_0px_#000]">
                  <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 uppercase font-mono mb-3 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-purple-700 shrink-0" />
                    <span>Materiais Tangíveis Utilizados na Oficina</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-gray-800">
                    {step.pedagogicalMaterials.map((mat, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-200">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#D2F832] border border-black shrink-0"></span>
                        <span>{mat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Participant Feedback Quote */}
              {step.feedback && (
                <div className="bg-[#EDE7F6] border-[2.5px] border-black rounded-2xl p-4 sm:p-5 shadow-[4px_4px_0px_0px_#000] relative">
                  <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-purple-400 absolute top-3 right-3 opacity-30 pointer-events-none" />
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#38006b] uppercase block mb-1.5">
                    Voz da Participante & Registro Social
                  </span>
                  <blockquote className="text-xs sm:text-sm font-medium text-gray-900 italic leading-relaxed mb-3 pr-6">
                    "{step.feedback.quote}"
                  </blockquote>
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-gray-900 font-mono">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D2F832] border border-black shrink-0"></span>
                    <span>{step.feedback.author}</span>
                    <span className="text-gray-600 font-normal">({step.feedback.role})</span>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono font-bold text-gray-500 mr-1 flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  <span>Tópicos:</span>
                </span>
                {step.tags.map(t => (
                  <span key={t} className="text-[10px] sm:text-[11px] font-mono font-bold bg-white text-gray-800 px-2.5 py-1 rounded-md border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000]">
                    #{t}
                  </span>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-gray-100 border-t-2 border-black p-3 sm:p-4 px-4 sm:px-6 flex items-center justify-between shrink-0">
          <span className="text-[11px] sm:text-xs text-gray-600 font-mono hidden sm:inline">
            Projeto de Extensão Universitária • Registro Oficial e Base de Informações
          </span>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto min-h-[44px] px-6 py-2 bg-black text-white hover:bg-gray-800 font-bold text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          >
            Fechar Registro
          </button>
        </div>

      </div>
    </div>
  );
};
