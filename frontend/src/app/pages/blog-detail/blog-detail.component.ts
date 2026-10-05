import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PortfolioService } from '../../core/services/portfolio.service';
import { BlogPostDetail } from '../../core/models/portfolio.models';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page container" *ngIf="post as p; else loading">
      <a routerLink="/blog">{{ lang.t('blogDetail.back') }}</a>
      <h1>{{ p.title }}</h1>
      <p class="meta">{{ p.created_at | date: 'longDate' }}</p>
      <p style="white-space: pre-wrap;">{{ p.content }}</p>
    </div>
    <ng-template #loading>
      <div class="page container"><p>{{ lang.t('blogDetail.loading') }}</p></div>
    </ng-template>
  `,
  styles: [`.meta { color: var(--color-accent-hover); font-size: 0.85rem; margin: 4px 0 20px; }`],
})
export class BlogDetailComponent implements OnInit {
  lang = inject(LanguageService);
  post: BlogPostDetail | null = null;

  constructor(private route: ActivatedRoute, private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;
    this.portfolioService.getBlogPost(slug).subscribe({
      next: (p) => (this.post = p),
      error: () => (this.post = null),
    });
  }
}