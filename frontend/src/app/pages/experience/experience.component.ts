import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { PortfolioService } from '../../core/services/portfolio.service';
import { Experience } from '../../core/models/portfolio.models';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page container">
      <h1>{{ lang.t('experience.title') }}</h1>
      <div class="timeline" *ngIf="items.length; else empty">
        <div class="entry card" *ngFor="let e of items">
          <h3>{{ e.role }} · {{ e.company }}</h3>
          <p class="meta">
            {{ e.start_date | date: 'MMM y' }} —
            {{ e.is_current ? lang.t('experience.present') : (e.end_date | date: 'MMM y') }}
            <span *ngIf="e.location"> · {{ e.location }}</span>
          </p>
          <p>{{ e.description }}</p>
        </div>
      </div>
      <ng-template #empty>
        <p>{{ lang.t('experience.empty') }}</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .timeline { display: flex; flex-direction: column; gap: 16px; }
    .meta { color: var(--color-accent-hover); font-size: 0.85rem; margin: 4px 0 12px; }
  `],
})
export class ExperienceComponent implements OnInit {
  lang = inject(LanguageService);
  items: Experience[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getExperience().subscribe({
      next: (items) => (this.items = items),
      error: () => (this.items = []),
    });
  }
}