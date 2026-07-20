import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Ross Bohlander',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'projects',
    title: 'Projects',
    loadComponent: () => import('./pages/projects/projects').then((m) => m.Projects),
  },
  {
    path: 'projects/:slug',
    title: 'Project',
    loadComponent: () => import('./pages/projects/project-detail/project-detail').then((m) => m.ProjectDetail),
  },
  {
    path: 'about',
    title: 'About',
    loadComponent: () => import('./pages/about/about').then((m) => m.About),
  },
  {
    path: 'contact',
    title: 'Contact',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
  },
  {
    path: '**',
    title: 'Not found',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];
