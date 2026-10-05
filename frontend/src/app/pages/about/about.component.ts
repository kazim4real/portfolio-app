import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { PortfolioService } from '../../core/services/portfolio.service';
import { Profile } from '../../core/models/portfolio.models';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page container">
      <h1> {{ lang.t('about.title') }} </h1>
      <ng-container *ngIf="profile; else empty">
      <img *ngIf="profile.avatar" [src]="profile.avatar" alt="Profile photo" class="avatar" />
        <p>{{ lang.pick(profile.bio, profile.bio_en) }}</p>
        <p *ngIf="profile.location">📍 {{ profile.location }}</p>
        <div class="links">
          <a *ngIf="profile.github_url" [href]="profile.github_url" target="_blank">GitHub</a>
          <a *ngIf="profile.linkedin_url" [href]="profile.linkedin_url" target="_blank">LinkedIn</a>
          <a *ngIf="profile.twitter_url" [href]="profile.twitter_url" target="_blank">Twitter</a>
          <a *ngIf="profile.resume_file" [href]="profile.resume_file" target="_blank">{{ lang.t('about.resume') }}</a>
        </div>
      </ng-container>
      <ng-template #empty>
        <p> {{ lang.t('about.empty') }} </p>
      </ng-template>
    </div>
  `,
    styles: [`
    .links { display: flex; gap: 16px; margin-top: 20px; }
  `],
})
export class AboutComponent implements OnInit {
  lang = inject(LanguageService);
  profile: Profile | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getProfile().subscribe({
      next: (p) => (this.profile = p),
      error: () => (this.profile = null),
    });
  }
}