import React, { useState } from 'react';
import { computationalThinkingPillars } from '../data/projectData';
import { Cpu, Brain, Split, Repeat, Filter, ListOrdered, ArrowUpRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Split': return <Split className="w-5 h-5 text-black" />;
      case 'Repeat': return <Repeat className="w-5 h-5 text-black" />;
      case 'Filter': return <Filter className="w-5 h-5 text-black" />;
      case 'ListOrdered': return <ListOrdered className="w-5 h-5 text-black" />;
      default: return <Brain className="w-5 h-5 text-black" />;
    }
  };

  return (
    <section id="sobre" className="py-8 sm:py-12 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header with Lime Underline matching Image 1.png */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-950 uppercase font-['Outfit'] inline-block relative">
            SOBRE O PROJETO
            <span className="block w-full h-1.5 bg-[#D2F832] mt-1 rounded-full border border-black"></span>
          </h2>
          <p className="text-xs sm:text-base text-gray-600 font-medium mt-2 max-w-2xl">
            Uma iniciativa universitária de extensão desenhada por mulheres para mulheres, valorizando a criatividade comunitária.
          </p>
        </div>

        {/* 2-Column Cards matching Image 1.png */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mb-8 sm:mb-10">
          
          {/* Left Card: Computação Desplugada */}
          <div className="lg:col-span-8 bg-white border-[2.5px] border-black rounded-2xl shadow-[4px_4px_0px_0px_#000] sm:shadow-[5px_5px_0px_0px_#000] overflow-hidden flex flex-col justify-between">
            {/* Header bar with Lime background matching Image 1.png */}
            <div className="bg-[#D2F832] border-b-[2.5px] border-black px-4 sm:px-5 py-2.5 sm:py-3 flex items-center gap-2 font-extrabold text-xs sm:text-sm uppercase tracking-wider text-black font-mono">
              <Cpu className="w-4 h-4 text-black shrink-0" />
              <span>COMPUTAÇÃO DESPLUGADA</span>
            </div>

            {/* Card Body */}
            <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-between flex-1">
              <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed font-medium">
                Acreditamos que a base da tecnologia não está nas máquinas, mas na <strong>forma de pensar</strong>. O projeto <strong>"Conectando Mulheres"</strong> foca em ensinar algoritmos, lógica de programação e resolução de problemas sem o uso imediato de computadores. Utilizamos jogos, dinâmicas físicas e desafios visuais para desmistificar a área tech.
              </p>

              <div className="mt-5 sm:mt-6 pt-4 sm:pt-6 border-t-2 border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 text-xs font-bold text-gray-700">
                <div className="flex items-center gap-2 bg-purple-50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-purple-100 border border-black flex items-center justify-center text-purple-900 font-mono text-xs shrink-0">✓</div>
                  <span>100% Gratuito e Acessível</span>
                </div>
                <div className="flex items-center gap-2 bg-lime-50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#D2F832] border border-black flex items-center justify-center text-black font-mono text-xs shrink-0">✓</div>
                  <span>Sem Pré-requisito Técnico</span>
                </div>
                <div className="flex items-center gap-2 bg-purple-50 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-purple-100 border border-black flex items-center justify-center text-purple-900 font-mono text-xs shrink-0">✓</div>
                  <span>Certificação de Extensão</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Desenvolva Habilidades */}
          <div className="lg:col-span-4 bg-[#EDE7F6] border-[2.5px] border-black rounded-2xl p-5 sm:p-6 lg:p-8 shadow-[4px_4px_0px_0px_#000] sm:shadow-[5px_5px_0px_0px_#000] flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border-2 border-black shadow-[3px_3px_0px_0px_#000] flex items-center justify-center mb-3 sm:mb-4 text-[#480988]">
              <Brain className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-gray-950 font-['Outfit'] mb-1 sm:mb-2">
              Desenvolva Habilidades
            </h3>
            
            <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed max-w-xs">
              Lógica estruturada, autonomia criativa e pensamento crítico para os desafios do dia a dia.
            </p>

            <div className="mt-4 sm:mt-6 w-full pt-3 sm:pt-4 border-t-2 border-purple-300/60 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-bold text-purple-950 font-mono">
              <span>✦ PENSAMENTO COMPUTACIONAL</span>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Computational Thinking */}
        <div id="pilares" className="mt-4 sm:mt-6">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-xl font-extrabold text-gray-900 font-['Outfit'] flex items-center gap-2">
              <span>Os 4 Pilares da Lógica Desplugada</span>
              <span className="text-[10px] sm:text-xs bg-black text-white px-2 py-0.5 rounded font-mono font-normal">Metodologia</span>
            </h3>
            <span className="text-[11px] text-gray-500 hidden sm:inline font-mono">Toque para ver exemplo prático</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {computationalThinkingPillars.map((pillar) => {
              const isSelected = selectedPillar === pillar.id;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setSelectedPillar(isSelected ? null : pillar.id)}
                  className={`cursor-pointer bg-white border-2 border-black rounded-xl p-3.5 sm:p-4 shadow-[3px_3px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex flex-col justify-between ${
                    isSelected ? 'ring-2 ring-[#480988] bg-purple-50/70' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000]"
                        style={{ backgroundColor: pillar.color }}
                      >
                        {getPillarIcon(pillar.icon)}
                      </div>
                      <span className="text-xs text-gray-400 hover:text-black p-1">
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm sm:text-base text-gray-900 font-['Outfit'] mb-1">
                      {pillar.title}
                    </h4>

                    <p className="text-xs text-gray-600 leading-relaxed font-medium mb-2.5 sm:mb-3">
                      {pillar.shortDesc}
                    </p>
                  </div>

                  {/* Expandable Practical Example */}
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[10px] sm:text-[11px] font-bold text-purple-800 uppercase block font-mono">
                      No Cotidiano:
                    </span>
                    <p className="text-[11px] text-gray-700 italic mt-0.5">
                      "{pillar.inPractice}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
