export type StepStatus = 'concluido' | 'em_andamento' | 'planejado' | 'bloqueado';

export interface StepFeedback {
  quote: string;
  author: string;
  role: string;
  community: string;
  avatar?: string;
}

export interface StepMedia {
  type: 'image' | 'video' | 'drawing';
  url: string;
  caption: string;
  placeholderDesc?: string;
  gallery?: { url: string; caption: string }[];
}

export interface TimelineStep {
  id: string;
  stepNumber: string; // e.g. "01", "02", "03", "04"
  title: string;
  subtitle: string;
  weekRange: string; // e.g. "Semana 1-2"
  dateRange: string; // e.g. "01/Out - 15/Out"
  status: StepStatus;
  logicalConcept: string; // e.g. "Sequenciamento e Algoritmos"
  activityDescription: string;
  logicalObjective: string;
  pedagogicalMaterials: string[];
  tags: string[];
  iconType: 'robot' | 'bracelet' | 'cards' | 'flowchart' | 'puzzle' | 'logic';
  media: StepMedia;
  feedback?: StepFeedback;
}

export interface TeamMember {
  id: string;
  name: string;
  category: 'docente' | 'discente';
  titleOrCourse: string; // e.g. "Profa. Dra. em Ciência da Computação" or "Engenharia de Software (5º período)"
  roleInProject: string; // e.g. "Coordenadora Geral", "Líder de Oficinas", "Responsável pelo Site"
  bio: string;
  avatarUrl: string;
  lattesUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

export interface ImpactMetric {
  id: string;
  value: string;
  label: string;
  description: string;
  iconName?: string;
}

export interface CommunityTestimonial {
  id: string;
  name: string;
  role: string;
  community: string;
  avatar: string;
  quote: string;
  activityName: string;
  date: string;
}

export interface ProjectSettings {
  projectName: string;
  impactHeadline: string;
  subtitle: string;
  institutionName: string;
  communityName: string;
  description: string;
  heroBadge: string;
  contactEmail: string;
  instagramHandle: string;
  globalProgressOverride?: number | null; // If null, auto-calculated from steps
}
