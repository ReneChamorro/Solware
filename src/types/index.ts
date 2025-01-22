export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: number;
  title: string;
  challenge: string;
  solution: string;
  results: string;
  image: string;
  client: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: 'Automatización' | 'CRM' | 'Tendencias Digitales';
  date: string;
  image: string;
}