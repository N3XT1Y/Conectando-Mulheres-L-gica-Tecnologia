import React from 'react';
import { useProjectData } from '../context/ProjectContext';
import { Quote } from 'lucide-react';

export const ImpactSection: React.FC = () => {
  const { metrics, testimonials } = useProjectData();

  return (
    <section id="impacto" className="py-8 sm:py-14 px-3.5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Main Purple Dotted Impact Bar matching Image 1.png */}
        <div className="relative bg-[#2C075D] bg-dot-pattern border-[2.5px] border-black rounded-[20px] sm:rounded-[28px] p-5 sm:p-10 shadow-[5px_5px_0px_0px_#000] sm:shadow-[7px_7px_0px_0px_#000] overflow-hidden">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 items-center">
            {metrics.map((metric, index) => (
              <div
                key={metric.id}
                className={`text-center flex flex-col items-center justify-center p-2 sm:p-0 ${
                  index % 2 === 1 ? 'border-l border-purple-800/80 sm:border-l-0' : ''
                } ${index >= 2 ? 'border-t sm:border-t-0 border-purple-800/80 pt-4 sm:pt-0' : ''} ${
                  index > 0 ? 'sm:border-l-2 sm:border-purple-800/80 sm:pl-6' : ''
                }`}
              >
                <span className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#D2F832] font-mono tracking-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  {metric.value}
                </span>
                
                <span className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm font-extrabold text-white uppercase tracking-wider font-mono max-w-[180px] leading-snug">
                  {metric.label}
                </span>

                <span className="text-[10px] sm:text-[11px] text-purple-200 mt-0.5 sm:mt-1 font-medium hidden sm:block">
                  {metric.description}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Community Testimonials (Vozes da Comunidade) */}
        <div>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-950 uppercase font-['Outfit'] inline-block relative">
              VOZES DA COMUNIDADE & IMPACTO SOCIAL
              <span className="block w-full h-1.5 bg-[#D2F832] mt-1 rounded-full border border-black"></span>
            </h2>
            <p className="text-xs sm:text-base text-gray-600 font-medium mt-2 max-w-2xl">
              Depoimentos reais de quem vivenciou as oficinas e descobriu a tecnologia além dos computadores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white border-[2.5px] border-black rounded-2xl p-4 sm:p-6 shadow-[3px_3px_0px_0px_#000] sm:shadow-[5px_5px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Quote header */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E8DEFF] border-2 border-black flex items-center justify-center text-[#38006b] shadow-[2px_2px_0px_0px_#000]">
                      <Quote className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold bg-[#D2F832] text-black px-2 py-0.5 rounded border border-black uppercase truncate max-w-[150px]">
                      {t.activityName.split(':')[0]}
                    </span>
                  </div>

                  <blockquote className="text-xs sm:text-sm text-gray-800 font-medium italic leading-relaxed mb-4 sm:mb-6">
                    "{t.quote}"
                  </blockquote>
                </div>

                {/* Author Info */}
                <div className="pt-3 sm:pt-4 border-t-2 border-gray-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-black object-cover shadow-[1px_1px_0px_0px_#000] shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-xs sm:text-sm text-gray-900 font-['Outfit'] truncate">
                      {t.name}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium truncate">
                      {t.role}
                    </p>
                    <span className="text-[9px] sm:text-[10px] text-purple-700 font-bold font-mono truncate block">
                      📍 {t.community}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
