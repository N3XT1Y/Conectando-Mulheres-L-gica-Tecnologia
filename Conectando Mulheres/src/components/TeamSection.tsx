import React from 'react';
import { useProjectData } from '../context/ProjectContext';
import { GraduationCap, Code, Mail } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const { team } = useProjectData();

  const docentes = team.filter(m => m.category === 'docente');
  const discentes = team.filter(m => m.category === 'discente');

  return (
    <section id="equipe" className="py-8 sm:py-14 px-3.5 sm:px-6 lg:px-8 bg-white border-b-2 border-black">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12">
        
        {/* Section Header with Lime Underline */}
        <div>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight text-gray-950 uppercase font-['Outfit'] inline-block relative">
            MULHERES NA LIDERANÇA: QUEM FAZ ACONTECER
            <span className="block w-full h-1.5 bg-[#D2F832] mt-1 rounded-full border border-black"></span>
          </h2>
          <p className="text-xs sm:text-base text-gray-600 font-medium mt-2 max-w-2xl">
            Corpo docente e alunas extensionistas dedicadas a aproximar a universidade e a comunidade através da computação desplugada.
          </p>
        </div>

        {/* Subdivisão A: Docentes Orientadoras */}
        <div>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#D2F832] border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_0px_#000]">
              <GraduationCap className="w-4 h-4 text-black" />
            </span>
            <h3 className="font-extrabold text-base sm:text-xl text-gray-900 font-['Outfit']">
              Docentes Orientadoras
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {docentes.map((prof) => (
              <div
                key={prof.id}
                className="bg-[#FBF9FF] border-[2.5px] border-black rounded-2xl p-4 sm:p-6 shadow-[4px_4px_0px_0px_#000] sm:shadow-[5px_5px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] transition-all flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-start"
              >
                {/* Circular Portrait with thick black border */}
                <div className="relative shrink-0">
                  <img
                    src={prof.avatarUrl}
                    alt={prof.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-[3px] border-black object-cover shadow-[3px_3px_0px_0px_#000]"
                  />
                  <span className="absolute -bottom-1 -right-1 bg-[#D2F832] text-black text-[9px] sm:text-[10px] font-black px-2 py-0.5 rounded-full border border-black uppercase font-mono">
                    Docente
                  </span>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h4 className="text-base sm:text-xl font-black text-gray-950 font-['Outfit']">
                    {prof.name}
                  </h4>
                  <div className="text-[11px] sm:text-xs font-bold text-purple-800 font-mono mt-0.5">
                    {prof.titleOrCourse}
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold text-gray-700 mt-1 mb-2 bg-white inline-block px-2 py-0.5 rounded border border-black">
                    {prof.roleInProject}
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {prof.bio}
                  </p>

                  {prof.email && (
                    <div className="mt-3 pt-2.5 border-t border-purple-200 flex items-center justify-center sm:justify-start gap-1 text-[11px] font-mono text-gray-700">
                      <Mail className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                      <span className="truncate">{prof.email}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subdivisão B: Discentes Extensionistas */}
        <div>
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#E8DEFF] border-2 border-black flex items-center justify-center font-bold shadow-[2px_2px_0px_0px_#000]">
              <Code className="w-4 h-4 text-[#38006b]" />
            </span>
            <h3 className="font-extrabold text-base sm:text-xl text-gray-900 font-['Outfit']">
              Discentes Extensionistas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {discentes.map((student) => (
              <div
                key={student.id}
                className="bg-white border-[2.5px] border-black rounded-2xl p-4 sm:p-5 shadow-[3px_3px_0px_0px_#000] sm:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-black object-cover shadow-[2px_2px_0px_0px_#000] shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-sm sm:text-base text-gray-950 font-['Outfit'] truncate">
                        {student.name}
                      </h4>
                      <span className="text-[10px] sm:text-[11px] font-bold text-purple-800 font-mono block truncate">
                        {student.titleOrCourse}
                      </span>
                    </div>
                  </div>

                  <div className="mb-2.5 sm:mb-3">
                    <span className="text-[10px] sm:text-[11px] font-extrabold bg-[#D2F832] text-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-black inline-block font-mono">
                      {student.roleInProject}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {student.bio}
                  </p>
                </div>

                <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] sm:text-xs text-gray-500 font-mono">
                  <span>Extensão</span>
                  <span className="text-purple-700 font-bold">♀ Mulheres na TI</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
