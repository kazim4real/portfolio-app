import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PortfolioService } from '../../core/services/portfolio.service';
import { Profile, Project } from '../../core/models/portfolio.models';
import { LanguageService } from '../../core/services/language.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page container">
      <section class="hero">
         <img *ngIf="profile?.avatar" [src]="profile!.avatar!" alt="Profile photo" class="avatar" />
         <div>
           <h1> {{ lang.t('home.greeting') }} <span class="gradient-text">{{ profile?.name || 'Your Name' }}</span></h1>
           <p class="tagline">{{ profile?.title || 'Full-Stack Developer' }}</p>
           <p>{{ profile ? lang.pick(profile.bio, profile.bio_en) : 'Add your bio in the Django admin to see it here.' }}</p>
           <div class="cta">
             <a routerLink="/projects" class="btn"> {{ lang.t('home.viewProjects') }} </a>
             <a routerLink="/contact" class="btn btn-outline"> {{ lang.t('home.getInTouch') }} </a>
           </div>
         </div>
      </section>

      <h2> {{ lang.t('home.featured') }} </h2>
      <div class="grid" *ngIf="featured.length; else noProjects">
        <div class="card" *ngFor="let p of featured">
          <h3>{{ p.title }}</h3>
          <p>{{ p.short_description }}</p>
          <div>
            <span class="tag" *ngFor="let s of p.tech_stack">{{ s.name }}</span>
          </div>
          <a [routerLink]="['/projects', p.slug]"> {{ lang.t('home.learnMore') }} </a>
        </div>
      </div>
      <ng-template #noProjects>
        <p> {{ lang.t('home.noFeatured') }} </p>
      </ng-template>
    </div>
  `,
  styles: [`
    .hero { display: flex; align-items: center; gap: 40px; flex-wrap: wrap; padding: 40px 0 20px; }
    .hero > div { flex: 1; min-width: 280px; }
    .tagline { color: var(--color-accent-hover); font-weight: 600; font-size: 1.1rem; }
    .cta { display: flex; gap: 12px; margin-top: 20px; }
  `],
})
export class HomeComponent implements OnInit {
  lang = inject(LanguageService);
  profile: Profile | null = null;
  featured: Project[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getProfile().subscribe({
      next: (p) => (this.profile = p),
      error: () => (this.profile = null),
    });
    this.portfolioService.getProjects(true).subscribe({
      next: (projects) => (this.featured = projects),
      error: () => (this.featured = []),
    });
  }
}