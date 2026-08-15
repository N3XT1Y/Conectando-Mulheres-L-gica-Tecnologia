import React, { useState } from 'react';
import { useProjectData } from '../context/ProjectContext';
import { TimelineStep, StepStatus, ProjectSettings } from '../types';
import {
  X,
  Plus,
  Trash2,
  Edit,
  Save,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Sliders,
  FileText
} from 'lucide-react';

interface AdminEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminEditModal: React.FC<AdminEditModalProps> = ({ isOpen, onClose }) => {
  const {
    settings,
    updateSettings,
    steps,
    updateStep,
    addNewStep,
    deleteStep,
    exportProjectJson,
    importProjectJson,
    resetToDefaults
  } = useProjectData();

  const [activeTab, setActiveTab] = useState<'steps' | 'settings' | 'backup'>('steps');
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [stepToDeleteId, setStepToDeleteId] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');

  if (!isOpen) return null;

  const handleDeleteStep = (id: string, stepNum: string) => {
    deleteStep(id);
    if (editingStepId === id) setEditingStepId(null);
    setStepToDeleteId(null);
    setFeedbackMsg(`Etapa ${stepNum} excluída com sucesso!`);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleExport = () => {
    const jsonStr = exportProjectJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conectando-mulheres-dados-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setFeedbackMsg('Dados exportados com sucesso!');
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const success = importProjectJson(importJsonText);
    if (success) {
      setFeedbackMsg('Dados importados com sucesso!');
      setImportJsonText('');
      setTimeout(() => setFeedbackMsg(null), 3000);
    } else {
      alert('Erro ao importar JSON. Verifique o formato do arquivo.');
    }
  };

  const handleAddNewStepTemplate = () => {
    const nextNum = (steps.length + 1).toString().padStart(2, '0');
    addNewStep({
      stepNumber: nextNum,
      title: `Nova Oficina: Etapa ${nextNum}`,
      subtitle: 'Descrição da dinâmica desplugada',
      weekRange: `Semana ${steps.length * 2 + 1}-${steps.length * 2 + 2}`,
      dateRange: 'A definir',
      status: 'planejado',
      logicalConcept: 'Novo Conceito de Programação',
      activityDescription: 'Descreva como as participantes irão interagir e vivenciar a computação desplugada nesta etapa.',
      logicalObjective: 'Descreva o objetivo acadêmico/lógico desta oficina.',
      pedagogicalMaterials: ['Cartolinas', 'Canetas coloridas', 'Jogos impressos'],
      tags: ['Desplugado', 'Comunidade'],
      iconType: 'puzzle',
      media: {
        type: 'image',
        url: '',
        caption: 'Registro fotográfico da oficina',
        placeholderDesc: 'Foto das alunas participando da atividade.'
      },
      feedback: {
        quote: 'Depoimento da participante sobre o impacto desta oficina.',
        author: 'Participante da Comunidade',
        role: 'Moradora Local',
        community: settings.communityName
      }
    });
    setFeedbackMsg('Nova etapa adicionada com sucesso!');
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs">
      <div
        className="relative w-full max-w-4xl bg-white border-[2.5px] sm:border-[3px] border-black rounded-2xl sm:rounded-3xl shadow-[5px_5px_0px_0px_#000] sm:shadow-[8px_8px_0px_0px_#000] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#D2F832] border-b-[2.5px] border-black p-3.5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-black text-white border-2 border-black flex items-center justify-center text-sm sm:text-lg font-bold shadow-[2px_2px_0px_0px_#fff] shrink-0">
              ⚙️
            </span>
            <div className="min-w-0">
              <h3 className="text-base sm:text-2xl font-black text-gray-950 font-['Outfit'] truncate">
                Painel de Gestão
              </h3>
              <p className="text-[10px] sm:text-xs text-gray-800 font-mono font-bold truncate">
                Edição de etapas, status, fotos e textos
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white hover:bg-rose-100 text-gray-900 border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center transition-transform hover:rotate-90 shrink-0 ml-2"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-50 border-b-2 border-black px-2.5 sm:px-6 py-2 sm:py-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 shrink-0">
          <div className="grid grid-cols-3 gap-1.5 sm:flex sm:items-center sm:gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('steps')}
              className={`min-h-[38px] px-1.5 sm:px-3.5 py-1.5 rounded-lg border-2 border-black font-bold text-[11px] sm:text-xs shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-center ${
                activeTab === 'steps' ? 'bg-[#38006b] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
              <span className="truncate">Etapas ({steps.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`min-h-[38px] px-1.5 sm:px-3.5 py-1.5 rounded-lg border-2 border-black font-bold text-[11px] sm:text-xs shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-center ${
                activeTab === 'settings' ? 'bg-[#38006b] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
              <span className="truncate">Configurações</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('backup')}
              className={`min-h-[38px] px-1.5 sm:px-3.5 py-1.5 rounded-lg border-2 border-black font-bold text-[11px] sm:text-xs shadow-[1.5px_1.5px_0px_0px_#000] sm:shadow-[2px_2px_0px_0px_#000] transition-all flex items-center justify-center gap-1 sm:gap-1.5 text-center ${
                activeTab === 'backup' ? 'bg-[#38006b] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Download className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
              <span className="truncate">Exportar</span>
            </button>
          </div>

          {feedbackMsg && (
            <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-emerald-400 animate-pulse text-center sm:text-left self-center sm:self-auto">
              ✓ {feedbackMsg}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-3 sm:p-6 overflow-y-auto overflow-x-hidden flex-1 space-y-4 sm:space-y-6">
          
          {/* TAB 1: STEPS MANAGER */}
          {activeTab === 'steps' && (
            <div className="space-y-3 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-extrabold text-sm sm:text-lg text-gray-900 font-['Outfit']">
                    Linha do Tempo das Oficinas
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-600">
                    Alterne o status das atividades conforme o projeto avança.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddNewStepTemplate}
                  className="min-h-[38px] sm:min-h-[40px] px-3.5 py-1.5 sm:py-2 bg-[#D2F832] hover:bg-[#c6f028] text-black font-bold text-xs border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000] flex items-center justify-center gap-1.5 self-stretch sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nova Etapa</span>
                </button>
              </div>

              <div className="space-y-2.5 sm:space-y-4">
                {steps.map((step) => {
                  const isEditing = editingStepId === step.id;
                  return (
                    <div
                      key={step.id}
                      className="bg-[#FAF8FF] border-2 border-black rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-[2px_2px_0px_0px_#000] sm:shadow-[3px_3px_0px_0px_#000]"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 sm:pb-3 border-b-2 border-gray-200">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#38006b] text-white border-2 border-black flex items-center justify-center font-mono font-black text-xs sm:text-sm shrink-0">
                            {step.stepNumber}
                          </span>
                          <div className="min-w-0 flex-1">
                            <h5 className="font-extrabold text-xs sm:text-base text-gray-950 font-['Outfit'] truncate">
                              {step.title}
                            </h5>
                            <span className="text-[10px] sm:text-xs text-purple-800 font-mono font-bold block truncate">
                              {step.weekRange} • {step.logicalConcept}
                            </span>
                          </div>
                        </div>

                        {/* Status Select & Action Buttons */}
                        <div className="flex items-center gap-1.5 self-stretch sm:self-auto justify-between sm:justify-end">
                          <select
                            value={step.status}
                            onChange={(e) => updateStep(step.id, { status: e.target.value as StepStatus })}
                            className="flex-1 sm:flex-initial bg-white border-2 border-black rounded-lg px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold font-mono shadow-[1.5px_1.5px_0px_0px_#000] cursor-pointer min-h-[36px]"
                          >
                            <option value="concluido">🟢 Concluído</option>
                            <option value="em_andamento">🟣 Em Andamento</option>
                            <option value="planejado">⚪ Planejado</option>
                            <option value="bloqueado">🔒 Bloqueado</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              setStepToDeleteId(null);
                              setEditingStepId(isEditing ? null : step.id);
                            }}
                            className="min-h-[36px] min-w-[36px] p-1.5 bg-white hover:bg-gray-100 border-2 border-black rounded-lg text-xs font-bold shadow-[1.5px_1.5px_0px_0px_#000] flex items-center justify-center shrink-0"
                            title="Editar todos os campos"
                          >
                            <Edit className="w-3.5 h-3.5 text-purple-800" />
                          </button>

                          {steps.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                setStepToDeleteId(stepToDeleteId === step.id ? null : step.id);
                              }}
                              className={`min-h-[36px] min-w-[36px] p-1.5 border-2 border-black rounded-lg text-xs font-bold shadow-[1.5px_1.5px_0px_0px_#000] flex items-center justify-center shrink-0 transition-colors ${
                                stepToDeleteId === step.id
                                  ? 'bg-red-600 text-white'
                                  : 'bg-white hover:bg-red-50 text-red-600'
                              }`}
                              title="Excluir etapa"
                              aria-label={`Excluir etapa ${step.stepNumber}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Inline Delete Confirmation Prompt */}
                      {stepToDeleteId === step.id && (
                        <div className="mt-2.5 p-3 bg-red-50 border-2 border-red-500 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-2.5 animate-in fade-in duration-150">
                          <div className="flex items-center gap-2 text-red-900 text-xs font-bold">
                            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                            <span>Confirmar exclusão da <strong>Etapa {step.stepNumber} ({step.title})</strong>?</span>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={() => handleDeleteStep(step.id, step.stepNumber)}
                              className="flex-1 sm:flex-initial min-h-[34px] px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-lg border border-black shadow-[1.5px_1.5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                            >
                              Sim, Excluir
                            </button>
                            <button
                              type="button"
                              onClick={() => setStepToDeleteId(null)}
                              className="flex-1 sm:flex-initial min-h-[34px] px-3 py-1 bg-white hover:bg-gray-100 text-gray-800 font-bold text-xs rounded-lg border border-black shadow-[1.5px_1.5px_0px_0px_#000]"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Expandable Form if Editing */}
                      {isEditing && (
                        <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t-2 border-purple-200 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs">
                          <div>
                            <label className="font-bold text-gray-700 block mb-1">Título da Oficina:</label>
                            <input
                              type="text"
                              value={step.title}
                              onChange={(e) => updateStep(step.id, { title: e.target.value })}
                              className="w-full bg-white border-2 border-black rounded-lg p-2 font-medium"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-gray-700 block mb-1">Semanas / Período:</label>
                            <input
                              type="text"
                              value={step.weekRange}
                              onChange={(e) => updateStep(step.id, { weekRange: e.target.value })}
                              className="w-full bg-white border-2 border-black rounded-lg p-2 font-medium"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-gray-700 block mb-1">Conceito Lógico:</label>
                            <input
                              type="text"
                              value={step.logicalConcept}
                              onChange={(e) => updateStep(step.id, { logicalConcept: e.target.value })}
                              className="w-full bg-white border-2 border-black rounded-lg p-2 font-medium"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-gray-700 block mb-1">URL da Imagem:</label>
                            <input
                              type="text"
                              value={step.media.url}
                              onChange={(e) => updateStep(step.id, { media: { ...step.media, url: e.target.value } })}
                              placeholder="https://..."
                              className="w-full bg-white border-2 border-black rounded-lg p-2 font-mono text-[11px]"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="font-bold text-gray-700 block mb-1">Descrição da Atividade Desplugada:</label>
                            <textarea
                              rows={2}
                              value={step.activityDescription}
                              onChange={(e) => updateStep(step.id, { activityDescription: e.target.value })}
                              className="w-full bg-white border-2 border-black rounded-lg p-2 font-medium"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="font-bold text-gray-700 block mb-1">Objetivo Lógico / Didático:</label>
                            <textarea
                              rows={2}
                              value={step.logicalObjective}
                              onChange={(e) => updateStep(step.id, { logicalObjective: e.target.value })}
                              className="w-full bg-white border-2 border-black rounded-lg p-2 font-medium"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <label className="font-bold text-gray-700 block mb-1">Depoimento da Participante:</label>
                            <textarea
                              rows={2}
                              value={step.feedback?.quote || ''}
                              onChange={(e) =>
                                updateStep(step.id, {
                                  feedback: {
                                    quote: e.target.value,
                                    author: step.feedback?.author || 'Participante',
                                    role: step.feedback?.role || 'Comunidade',
                                    community: step.feedback?.community || settings.communityName
                                  }
                                } as any)
                              }
                              className="w-full bg-white border-2 border-black rounded-lg p-2 font-medium"
                            />
                          </div>

                          {/* Action inside form */}
                          <div className="md:col-span-2 flex items-center justify-between pt-2 border-t border-gray-200">
                            <button
                              type="button"
                              onClick={() => setEditingStepId(null)}
                              className="min-h-[36px] px-3.5 py-1.5 bg-[#D2F832] text-black font-bold text-xs rounded-lg border-2 border-black shadow-[1.5px_1.5px_0px_0px_#000]"
                            >
                              Salvar & Fechar Edição
                            </button>
                            {steps.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setStepToDeleteId(step.id)}
                                className="min-h-[36px] px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs rounded-lg border border-red-300 flex items-center gap-1.5"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>Excluir Etapa {step.stepNumber}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-4 text-xs">
              <h4 className="font-extrabold text-base sm:text-lg text-gray-900 font-['Outfit']">
                Informações Institucionais & Textos
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Nome do Projeto:</label>
                  <input
                    type="text"
                    value={settings.projectName}
                    onChange={(e) => updateSettings({ projectName: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded-lg p-2 font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Instituição / Faculdade:</label>
                  <input
                    type="text"
                    value={settings.institutionName}
                    onChange={(e) => updateSettings({ institutionName: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Comunidade Atendida:</label>
                  <input
                    type="text"
                    value={settings.communityName}
                    onChange={(e) => updateSettings({ communityName: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">E-mail de Contato:</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded-lg p-2"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-bold text-gray-700 block mb-1">Frase de Impacto Principal (Hero):</label>
                  <input
                    type="text"
                    value={settings.impactHeadline}
                    onChange={(e) => updateSettings({ impactHeadline: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded-lg p-2 font-bold"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-bold text-gray-700 block mb-1">Descrição Geral do Projeto:</label>
                  <textarea
                    rows={3}
                    value={settings.description}
                    onChange={(e) => updateSettings({ description: e.target.value })}
                    className="w-full bg-white border-2 border-black rounded-lg p-2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: BACKUP & EXPORT */}
          {activeTab === 'backup' && (
            <div className="space-y-4 sm:space-y-6 text-xs">
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-gray-900 font-['Outfit'] mb-1">
                  Exportar e Importar Registros do Projeto
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Baixe o arquivo JSON para anexar no relatório de extensão universitária ou restaurar em outros computadores.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-[#FAF8FF] border-2 border-black rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0px_0px_#000]">
                  <h5 className="font-bold text-sm text-gray-900 mb-1.5 flex items-center gap-1.5">
                    <Download className="w-4 h-4 text-purple-800" />
                    <span>Download do Arquivo de Dados</span>
                  </h5>
                  <p className="text-gray-600 mb-3 text-xs">
                    Gera um arquivo <code>.json</code> completo com todas as etapas, fotos e depoimentos.
                  </p>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="w-full min-h-[44px] bg-[#480988] text-white hover:bg-[#38066e] font-bold py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exportar JSON</span>
                  </button>
                </div>

                <div className="bg-rose-50/50 border-2 border-black rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0px_0px_#000]">
                  <h5 className="font-bold text-sm text-gray-900 mb-1.5 flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-rose-700" />
                    <span>Restaurar Valores Padrão</span>
                  </h5>
                  <p className="text-gray-600 mb-3 text-xs">
                    Restaura as 4 oficinas e configurações iniciais do modelo do Conectando Mulheres.
                  </p>
                  {showResetConfirm ? (
                    <div className="space-y-2 bg-white p-3 border-2 border-rose-400 rounded-xl">
                      <p className="text-rose-900 font-bold text-xs">Tem certeza que deseja restaurar os dados?</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            resetToDefaults();
                            setShowResetConfirm(false);
                            setFeedbackMsg('Dados restaurados para o padrão inicial!');
                            setTimeout(() => setFeedbackMsg(null), 3000);
                          }}
                          className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg border border-black"
                        >
                          Sim, Restaurar
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowResetConfirm(false)}
                          className="flex-1 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-lg border border-black"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowResetConfirm(true)}
                      className="w-full min-h-[44px] bg-white hover:bg-rose-100 text-rose-800 font-bold py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000]"
                    >
                      Restaurar Padrão
                    </button>
                  )}
                </div>
              </div>

              {/* Paste JSON Import */}
              <div className="bg-white border-2 border-black rounded-2xl p-3.5 sm:p-4 shadow-[3px_3px_0px_0px_#000]">
                <label className="font-bold text-gray-900 block mb-1">
                  Importar via Colagem de JSON:
                </label>
                <textarea
                  rows={3}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder="Cole aqui o conteúdo do arquivo JSON exportado..."
                  className="w-full font-mono text-[11px] p-2 bg-gray-50 border-2 border-black rounded-lg mb-2"
                />
                <button
                  type="button"
                  onClick={handleImport}
                  disabled={!importJsonText.trim()}
                  className="min-h-[40px] px-4 py-2 bg-[#D2F832] hover:bg-[#c5ec28] disabled:opacity-50 text-black font-bold text-xs border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_#000] flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Carregar Dados no Site</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-gray-100 border-t-2 border-black p-3 sm:p-4 px-4 sm:px-6 flex items-center justify-between shrink-0">
          <span className="text-[10px] sm:text-xs text-gray-600 font-mono hidden sm:inline">
            As alterações são salvas automaticamente no armazenamento local.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto min-h-[44px] px-6 py-2 bg-[#D2F832] text-black font-extrabold text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:bg-[#c6f028]"
          >
            Concluir Edição
          </button>
        </div>

      </div>
    </div>
  );
};
