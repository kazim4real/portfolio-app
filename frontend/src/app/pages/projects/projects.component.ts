import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PortfolioService } from '../../core/services/portfolio.service';
import { Project } from '../../core/models/portfolio.models';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page container">
      <h1>{{ lang.t('projects.title') }}</h1>
      <div class="grid" *ngIf="projects.length; else empty">
        <div class="card" *ngFor="let p of projects">
          <img *ngIf="p.image" [src]="p.image" [alt]="p.title" class="thumb" />
          <h3>{{ p.title }}</h3>
          <p>{{ p.short_description }}</p>
          <div>
            <span class="tag" *ngFor="let s of p.tech_stack">{{ s.name }}</span>
          </div>
          <a [routerLink]="['/projects', p.slug]">{{ lang.t('home.learnMore') }}</a>
        </div>
      </div>
      <ng-template #empty>
        <p>{{ lang.t('projects.empty') }}</p>
      </ng-template>
    </div>
  `,
})
export class ProjectsComponent implements OnInit {
  lang = inject(LanguageService);
  projects: Project[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getProjects().subscribe({
      next: (projects) => (this.projects = projects),
      error: () => (this.projects = []),
    });
  }
}