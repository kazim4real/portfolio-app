export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon: string;
  order: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  short_description_en?: string;
  description: string;
  description_en?: string;
  image: string | null;
  tech_stack: Skill[];
  github_url: string;
  live_url: string;
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  description_en?: string;
  order: number;
  is_current: boolean;
}

export interface BlogPostSummary {
  id: number;
  title: string;
  title_en?: string;
  slug: string;
  excerpt: string;
  excerpt_en?: string;
  created_at: string;
}

export interface BlogPostDetail extends BlogPostSummary {
  content: string;
  content_en?: string;
  updated_at: string;
}

export interface Profile {
  id: number;
  name: string;
  title: string;
  title_en?: string;
  bio: string;
  bio_en?: string;
  email: string;
  location: string;
  avatar: string | null;
  resume_file: string | null;
  github_url: string;
  linkedin_url: string;
  twitter_url: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
