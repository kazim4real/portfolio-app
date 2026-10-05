import { Injectable, signal } from '@angular/core';
import { Lang, TRANSLATIONS } from '../i18n/translations';

const STORAGE_KEY = 'portfolio-lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  currentLang = signal<Lang>(this.readInitialLang());

  private readInitialLang(): Lang {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' ? 'en' : 'fr';
  }

  setLang(lang: Lang): void {
    this.currentLang.set(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  toggle(): void {
    this.setLang(this.currentLang() === 'fr' ? 'en' : 'fr');
  }

  t(key: string): string {
    return TRANSLATIONS[key]?.[this.currentLang()] ?? key;
  }

  pick(fr: string, en?: string | null): string {
    if (this.currentLang() === 'en' && en && en.trim()) return en;
    return fr;
  }
}