import { Component, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="container">
        <p>&copy; {{ year }} Al-kazim Amine. {{ lang.t('footer.text') }}</p>
      </div>
    </footer>
  `,
  styles: [`
    footer { border-top: 1px solid var(--color-border); padding: 24px 0; }
    p { margin: 0; font-size: 0.85rem; text-align: center; }
  `],
})
export class FooterComponent {
  lang = inject(LanguageService);
  year = new Date().getFullYear();
}