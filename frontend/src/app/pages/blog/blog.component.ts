import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PortfolioService } from '../../core/services/portfolio.service';
import { BlogPostSummary } from '../../core/models/portfolio.models';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page container">
      <h1>{{ lang.t('blog.title') }}</h1>
      <div class="list" *ngIf="posts.length; else empty">
        <div class="card post" *ngFor="let post of posts">
          <h3><a [routerLink]="['/blog', post.slug]">{{ post.title }}</a></h3>
          <p class="meta">{{ post.created_at | date: 'longDate' }}</p>
          <p>{{ post.excerpt }}</p>
        </div>
      </div>
      <ng-template #empty>
        <p>{{ lang.t('blog.empty') }}</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .list { display: flex; flex-direction: column; gap: 16px; }
    .meta { color: var(--color-accent-hover); font-size: 0.85rem; margin: 2px 0 10px; }
  `],
})
export class BlogComponent implements OnInit {
  lang = inject(LanguageService);
  posts: BlogPostSummary[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getBlogPosts().subscribe({
      next: (posts) => (this.posts = posts),
      error: () => (this.posts = []),
    });
  }
}