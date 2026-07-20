export interface Project {
  slug: string;
  name: string;
  summary: string;
  shortSummary: string;
  tags: string[];
  category: 'personal' | 'professional';
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}
