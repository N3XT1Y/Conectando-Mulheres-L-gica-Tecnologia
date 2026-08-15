import React, { useState } from 'react';
import { useProjectData } from '../context/ProjectContext';
import { ChevronUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings } = useProjectData();
  const [showFaqModal, setShowFaqModal] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-white border-t-[3px] border-black pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Row matching Image 1.png */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-gray-800">
          
          {/* Brand Logo matching Image 1.png */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#D2F832] border-2 border-black flex items-center justify-center text-black text-2xl font-black shadow-[3px_3px_0px_0px_#fff]">
              ♀
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-[#D2F832] font-['Outfit'] uppercase block">
                {settings.projectName}
              </span>
              <span className="text-xs text-gray-400 font-mono">
                {settings.institutionName} • Extensão Universitária
              </span>
            </div>
          </div>

          {/* Navigation Links matching Image 1.png */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-extrabold uppercase tracking-wider font-mono text-gray-300">
            <a href="#sobre" className="hover:text-[#D2F832] transition-colors">
              Institucional
            </a>
            <a href="#jornada" className="hover:text-[#D2F832] transition-colors">
              Linha do Tempo
            </a>
            <a href="#equipe" className="hover:text-[#D2F832] transition-colors">
              Equipe
            </a>
            <button
              type="button"
              onClick={() => setShowFaqModal(true)}
              className="hover:text-[#D2F832] transition-colors cursor-pointer"
            >
              FAQ
            </button>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="hover:text-[#D2F832] transition-colors text-purple-400"
            >
              Contato
            </a>
          </div>

          {/* Scroll to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="w-10 h-10 rounded-xl bg-gray-800 hover:bg-[#D2F832] hover:text-black text-white border-2 border-gray-600 hover:border-black flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]"
            aria-label="Voltar ao topo"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

        </div>

        {/* Bottom Copyright matching Image 1.png */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-mono gap-3 text-center sm:text-left">
          <div>
            © 2024 - 2025 {settings.projectName}. Extensão Universitária em Computação Desplugada.
          </div>
          <div className="flex items-center gap-1.5 text-gray-300">
            <span>Desenvolvido com</span>
            <span className="text-rose-400">♥</span>
            <span>para empoderar mulheres na tecnologia</span>
          </div>
        </div>

      </div>

      {/* FAQ Modal */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white text-black border-[3px] border-black rounded-3xl p-6 max-w-xl w-full shadow-[8px_8px_0px_0px_#000] max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b-2 border-black">
              <h3 className="font-extrabold text-xl font-['Outfit']">Perguntas Frequentes (FAQ)</h3>
              <button
                type="button"
                onClick={() => setShowFaqModal(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 border border-black flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#FAF8FF] border-2 border-black rounded-xl">
                <h4 className="font-bold text-sm text-purple-900 mb-1">O que é Computação Desplugada?</h4>
                <p className="text-gray-700 leading-relaxed">
                  É uma metodologia que ensina conceitos fundamentais da ciência da computação (como algoritmos, estruturas de repetição e depuração) por meio de jogos, cartões, dinâmicas corporais e desafios tangíveis, sem telas ou computadores.
                </p>
              </div>

              <div className="p-3 bg-[#FAF8FF] border-2 border-black rounded-xl">
                <h4 className="font-bold text-sm text-purple-900 mb-1">Preciso ter computador ou celular para participar?</h4>
                <p className="text-gray-700 leading-relaxed">
                  Não! Todas as oficinas são 100% presenciais e práticas, e todo o material físico (fitas, miçangas, baralhos) é fornecido gratuitamente pelo projeto de extensão.
                </p>
              </div>

              <div className="p-3 bg-[#FAF8FF] border-2 border-black rounded-xl">
                <h4 className="font-bold text-sm text-purple-900 mb-1">Quem pode participar?</h4>
                <p className="text-gray-700 leading-relaxed">
                  Meninas e mulheres de qualquer idade da comunidade, sem necessidade de conhecimento prévio de matemática ou informática.
                </p>
              </div>

              <div className="p-3 bg-[#FAF8FF] border-2 border-black rounded-xl">
                <h4 className="font-bold text-sm text-purple-900 mb-1">Como levar o projeto para a minha escola ou centro comunitário?</h4>
                <p className="text-gray-700 leading-relaxed">
                  Entre em contato com nossa equipe docente através do e-mail oficial ({settings.contactEmail}) para agendar parcerias acadêmicas e oficinas presenciais na sua localidade.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowFaqModal(false)}
              className="mt-6 w-full py-2.5 bg-[#D2F832] text-black font-bold text-xs rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            >
              Fechar FAQ
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
