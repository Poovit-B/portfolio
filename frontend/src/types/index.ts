// Common types for the portfolio

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
}

export interface Skill {
  name: string;
  level: number;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface NavLink {
  name: string;
  href: string;
}

