export interface Project {
  slug: string;
  name: string;
  summary: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}
