import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <div class="container bar">
        <a routerLink="/" class="brand">Al-kazim Amine</a>
        <div class="links">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">{{ lang.t('nav.home') }}</a>
          <a routerLink="/about" routerLinkActive="active">{{ lang.t('nav.about') }}</a>
          <a routerLink="/projects" routerLinkActive="active">{{ lang.t('nav.projects') }}</a>
          <a routerLink="/experience" routerLinkActive="active">{{ lang.t('nav.experience') }}</a>
          <a routerLink="/skills" routerLinkActive="active">{{ lang.t('nav.skills') }}</a>
          <a routerLink="/blog" routerLinkActive="active">{{ lang.t('nav.blog') }}</a>
          <a routerLink="/contact" routerLinkActive="active">{{ lang.t('nav.contact') }}</a>
        </div>
        <button class="lang-toggle" (click)="lang.toggle()">
          {{ lang.currentLang() === 'fr' ? '🇬🇧 EN' : '🇫🇷 FR' }}
        </button>
      </div>
    </nav>
  `,
  styles: [`
    nav { border-bottom: 1px solid var(--color-border); position: sticky; top: 0; background: rgba(10, 11, 16, 0.65); backdrop-filter: blur(14px); z-index: 10; }
    .bar { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 16px; }
    .brand { font-weight: 700; font-size: 1.1rem; }
    .links { display: flex; gap: 20px; flex-wrap: wrap; }
    .links a { color: var(--color-text-muted); font-size: 0.92rem; }
    .links a.active, .links a:hover { color: var(--color-text); }
    .lang-toggle {
      background: transparent; border: 1px solid var(--color-border); color: var(--color-text);
      border-radius: 999px; padding: 6px 14px; font-size: 0.85rem; cursor: pointer; white-space: nowrap;
    }
    .lang-toggle:hover { border-color: var(--color-accent); }
  `],
})
export class NavbarComponent {
  lang = inject(LanguageService);
}