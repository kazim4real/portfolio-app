import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { PortfolioService } from '../../core/services/portfolio.service';
import { Skill } from '../../core/models/portfolio.models';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page container">
      <h1>{{ lang.t('skills.title') }}</h1>
      <ng-container *ngIf="categories.length; else empty">
        <div *ngFor="let cat of categories">
          <h2>{{ cat }}</h2>
          <div class="grid">
            <div class="card skill" *ngFor="let s of grouped[cat]">
              <span>{{ s.name }}</span>
              <div class="bar"><div class="fill" [style.width.%]="s.proficiency * 20"></div></div>
            </div>
          </div>
        </div>
      </ng-container>
      <ng-template #empty>
        <p>{{ lang.t('skills.empty') }}</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .skill { display: flex; flex-direction: column; gap: 8px; }
    .bar { height: 6px; border-radius: 3px; background: var(--color-border); overflow: hidden; }
    .fill { height: 100%; background: var(--color-accent); }
  `],
})
export class SkillsComponent implements OnInit {
  lang = inject(LanguageService);
  grouped: Record<string, Skill[]> = {};
  categories: string[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getSkills().subscribe({
      next: (skills) => {
        this.grouped = skills.reduce((acc, s) => {
          (acc[s.category] ||= []).push(s);
          return acc;
        }, {} as Record<string, Skill[]>);
        this.categories = Object.keys(this.grouped);
      },
      error: () => {
        this.grouped = {};
        this.categories = [];
      },
    });
  }
}