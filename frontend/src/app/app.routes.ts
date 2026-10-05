import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent) },
  { path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then((m) => m.ProjectsComponent) },
  { path: 'projects/:slug', loadComponent: () => import('./pages/project-detail/project-detail.component').then((m) => m.ProjectDetailComponent) },
  { path: 'experience', loadComponent: () => import('./pages/experience/experience.component').then((m) => m.ExperienceComponent) },
  { path: 'skills', loadComponent: () => import('./pages/skills/skills.component').then((m) => m.SkillsComponent) },
  { path: 'blog', loadComponent: () => import('./pages/blog/blog.component').then((m) => m.BlogComponent) },
  { path: 'blog/:slug', loadComponent: () => import('./pages/blog-detail/blog-detail.component').then((m) => m.BlogDetailComponent) },
  { path: 'contact', loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent) },
  { path: '**', redirectTo: '' },
];
