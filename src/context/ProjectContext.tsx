import React, { createContext, useContext, useState, useEffect } from 'react';
import { TimelineStep, TeamMember, ImpactMetric, CommunityTestimonial, ProjectSettings, StepStatus } from '../types';
import {
  initialProjectSettings,
  initialTimelineSteps,
  initialTeamMembers,
  initialImpactMetrics,
  initialTestimonials
} from '../data/projectData';

interface ProjectContextType {
  settings: ProjectSettings;
  steps: TimelineStep[];
  team: TeamMember[];
  metrics: ImpactMetric[];
  testimonials: CommunityTestimonial[];
  globalProgressPercentage: number;
  completedStepsCount: number;
  totalStepsCount: number;
  // Actions
  updateSettings: (newSettings: Partial<ProjectSettings>) => void;
  updateStep: (id: string, updatedFields: Partial<TimelineStep>) => void;
  setStepStatus: (id: string, newStatus: StepStatus) => void;
  addNewStep: (step: Omit<TimelineStep, 'id'>) => void;
  deleteStep: (id: string) => void;
  updateTeamMember: (id: string, updatedFields: Partial<TeamMember>) => void;
  addTeamMember: (member: Omit<TeamMember, 'id'>) => void;
  deleteTeamMember: (id: string) => void;
  updateMetric: (id: string, value: string, label: string) => void;
  addTestimonial: (test: Omit<CommunityTestimonial, 'id'>) => void;
  resetToDefaults: () => void;
  exportProjectJson: () => string;
  importProjectJson: (jsonString: string) => boolean;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'conectando_mulheres_project_data_v1';

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ProjectSettings>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_settings');
    return saved ? JSON.parse(saved) : initialProjectSettings;
  });

  const [steps, setSteps] = useState<TimelineStep[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_steps');
    return saved ? JSON.parse(saved) : initialTimelineSteps;
  });

  const [team, setTeam] = useState<TeamMember[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_team');
    return saved ? JSON.parse(saved) : initialTeamMembers;
  });

  const [metrics, setMetrics] = useState<ImpactMetric[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_metrics');
    return saved ? JSON.parse(saved) : initialImpactMetrics;
  });

  const [testimonials, setTestimonials] = useState<CommunityTestimonial[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY + '_testimonials');
    return saved ? JSON.parse(saved) : initialTestimonials;
  });

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_steps', JSON.stringify(steps));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [steps]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_team', JSON.stringify(team));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [team]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_metrics', JSON.stringify(metrics));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [metrics]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY + '_testimonials', JSON.stringify(testimonials));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [testimonials]);

  // Calculate Progress
  const totalStepsCount = steps.length;
  const completedStepsCount = steps.filter(s => s.status === 'concluido').length;
  const inProgressStepsCount = steps.filter(s => s.status === 'em_andamento').length;

  const calculatedProgress = totalStepsCount > 0
    ? Math.round(((completedStepsCount + (inProgressStepsCount * 0.5)) / totalStepsCount) * 100)
    : 0;

  const globalProgressPercentage = settings.globalProgressOverride !== null && settings.globalProgressOverride !== undefined
    ? settings.globalProgressOverride
    : calculatedProgress;

  // Actions
  const updateSettings = (newSettings: Partial<ProjectSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const updateStep = (id: string, updatedFields: Partial<TimelineStep>) => {
    setSteps(prev => prev.map(step => step.id === id ? { ...step, ...updatedFields } : step));
  };

  const setStepStatus = (id: string, newStatus: StepStatus) => {
    setSteps(prev => prev.map(step => step.id === id ? { ...step, status: newStatus } : step));
  };

  const addNewStep = (stepData: Omit<TimelineStep, 'id'>) => {
    const newId = 'passo-' + (steps.length + 1) + '-' + Date.now().toString(36);
    const newStep: TimelineStep = {
      ...stepData,
      id: newId,
      stepNumber: (steps.length + 1).toString().padStart(2, '0')
    };
    setSteps(prev => [...prev, newStep]);
  };

  const deleteStep = (id: string) => {
    setSteps(prev => {
      const remaining = prev.filter(s => s.id !== id);
      return remaining.map((step, index) => ({
        ...step,
        stepNumber: (index + 1).toString().padStart(2, '0')
      }));
    });
  };

  const updateTeamMember = (id: string, updatedFields: Partial<TeamMember>) => {
    setTeam(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
  };

  const addTeamMember = (memberData: Omit<TeamMember, 'id'>) => {
    const newId = 'member-' + Date.now().toString(36);
    setTeam(prev => [...prev, { ...memberData, id: newId }]);
  };

  const deleteTeamMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
  };

  const updateMetric = (id: string, value: string, label: string) => {
    setMetrics(prev => prev.map(m => m.id === id ? { ...m, value, label } : m));
  };

  const addTestimonial = (testData: Omit<CommunityTestimonial, 'id'>) => {
    const newId = 'test-' + Date.now().toString(36);
    setTestimonials(prev => [{ ...testData, id: newId }, ...prev]);
  };

  const resetToDefaults = () => {
    setSettings(initialProjectSettings);
    setSteps(initialTimelineSteps);
    setTeam(initialTeamMembers);
    setMetrics(initialImpactMetrics);
    setTestimonials(initialTestimonials);
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_settings');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_steps');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_team');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_metrics');
    localStorage.removeItem(LOCAL_STORAGE_KEY + '_testimonials');
  };

  const exportProjectJson = () => {
    const payload = {
      settings,
      steps,
      team,
      metrics,
      testimonials,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(payload, null, 2);
  };

  const importProjectJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.settings) setSettings(parsed.settings);
      if (parsed.steps && Array.isArray(parsed.steps)) setSteps(parsed.steps);
      if (parsed.team && Array.isArray(parsed.team)) setTeam(parsed.team);
      if (parsed.metrics && Array.isArray(parsed.metrics)) setMetrics(parsed.metrics);
      if (parsed.testimonials && Array.isArray(parsed.testimonials)) setTestimonials(parsed.testimonials);
      return true;
    } catch (err) {
      console.error('Failed to import JSON', err);
      return false;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        settings,
        steps,
        team,
        metrics,
        testimonials,
        globalProgressPercentage,
        completedStepsCount,
        totalStepsCount,
        updateSettings,
        updateStep,
        setStepStatus,
        addNewStep,
        deleteStep,
        updateTeamMember,
        addTeamMember,
        deleteTeamMember,
        updateMetric,
        addTestimonial,
        resetToDefaults,
        exportProjectJson,
        importProjectJson
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectData = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjectData must be used within a ProjectProvider');
  }
  return context;
};
