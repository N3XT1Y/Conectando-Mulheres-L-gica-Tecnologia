import React, { useState } from 'react';
import { ProjectProvider } from './context/ProjectContext';
import { TimelineStep } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TimelineSection } from './components/TimelineSection';
import { TeamSection } from './components/TeamSection';
import { ImpactSection } from './components/ImpactSection';
import { StepDetailModal } from './components/StepDetailModal';
import { AdminEditModal } from './components/AdminEditModal';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedStep, setSelectedStep] = useState<TimelineStep | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  const handleExploreTimeline = () => {
    const el = document.getElementById('jornada');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreAbout = () => {
    const el = document.getElementById('sobre');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ProjectProvider>
      <div className="min-h-screen bg-[#F8F6FD] text-[#1A1A1A] flex flex-col font-['Plus_Jakarta_Sans']">
        
        {/* Navigation Bar */}
        <Navbar
          onOpenAdminModal={() => setIsAdminModalOpen(true)}
        />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Bloco 1: Topo / Hero Section */}
          <HeroSection
            onExploreTimeline={handleExploreTimeline}
            onExploreAbout={handleExploreAbout}
          />

          {/* Bloco 1.2: Sobre o Projeto & Pilares Desplugados */}
          <AboutSection />

          {/* Bloco 2: A Jornada / Linha do Tempo Passo a Passo (Registro) */}
          <TimelineSection onSelectStep={(step) => setSelectedStep(step)} />

          {/* Bloco 3: Quem Faz Acontecer / A Equipe */}
          <TeamSection />

          {/* Bloco 4: Impacto & Depoimentos */}
          <ImpactSection />
        </main>

        {/* Bloco 5: Rodapé Institucional */}
        <Footer />

        {/* Interactive Modals */}
        <StepDetailModal
          step={selectedStep}
          onClose={() => setSelectedStep(null)}
        />

        <AdminEditModal
          isOpen={isAdminModalOpen}
          onClose={() => setIsAdminModalOpen(false)}
        />

      </div>
    </ProjectProvider>
  );
}
