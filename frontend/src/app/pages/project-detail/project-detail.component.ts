import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PortfolioService } from '../../core/services/portfolio.service';
import { Project } from '../../core/models/portfolio.models';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page container" *ngIf="project as p; else loading">
      <a routerLink="/projects">{{ lang.t('projectDetail.back') }}</a>
      <h1>{{ p.title }}</h1>
      <img *ngIf="p.image" [src]="p.image" [alt]="p.title" class="cover" />
      <div>
        <span class="tag" *ngFor="let s of p.tech_stack">{{ s.name }}</span>
      </div>
      <p>{{ p.description }}</p>
      <div class="links">
        <a *ngIf="p.github_url" [href]="p.github_url" target="_blank" class="btn btn-outline">{{ lang.t('projectDetail.github') }}</a>
        <a *ngIf="p.live_url" [href]="p.live_url" target="_blank" class="btn">{{ lang.t('projectDetail.live') }}</a>
      </div>
    </div>
    <ng-template #loading>
      <div class="page container"><p>{{ lang.t('projectDetail.loading') }}</p></div>
    </ng-template>
  `,
  styles: [`.links { display: flex; gap: 12px; margin-top: 24px; }`],
})
export class ProjectDetailComponent implements OnInit {
  lang = inject(LanguageService);
  project: Project | null = null;

  constructor(private route: ActivatedRoute, private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;
    this.portfolioService.getProject(slug).subscribe({
      next: (p) => (this.project = p),
      error: () => (this.project = null),
    });
  }
}