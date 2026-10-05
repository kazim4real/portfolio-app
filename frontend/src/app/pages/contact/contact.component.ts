import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { PortfolioService } from '../../core/services/portfolio.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="page container narrow">
      <h1>{{ lang.t('contact.title') }}</h1>
      <p>{{ lang.t('contact.subtitle') }}</p>

      <form [formGroup]="form" (ngSubmit)="submit()" *ngIf="!success">
        <label for="name">{{ lang.t('contact.name') }}</label>
        <input id="name" formControlName="name" type="text" />

        <label for="email">{{ lang.t('contact.email') }}</label>
        <input id="email" formControlName="email" type="email" />

        <label for="subject">{{ lang.t('contact.subject') }}</label>
        <input id="subject" formControlName="subject" type="text" />

        <label for="message">{{ lang.t('contact.message') }}</label>
        <textarea id="message" formControlName="message" rows="6"></textarea>

        <button class="btn" type="submit" [disabled]="form.invalid || sending">
          {{ sending ? lang.t('contact.sending') : lang.t('contact.send') }}
        </button>
        <p class="error" *ngIf="error">{{ error }}</p>
      </form>

      <div class="card" *ngIf="success">
        <p>{{ lang.t('contact.success') }}</p>
      </div>
    </div>
  `,
  styles: [`
    .narrow { max-width: 560px; }
    .error { color: #ff6b6b; margin-top: 10px; }
  `],
})
export class ContactComponent {
  lang = inject(LanguageService);
  private fb = inject(FormBuilder);
  private portfolioService = inject(PortfolioService);

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', Validators.required],
  });
  sending = false;
  success = false;
  error = '';

  submit(): void {
    if (this.form.invalid) return;
    this.sending = true;
    this.error = '';
    this.portfolioService.sendContactMessage(this.form.getRawValue() as any).subscribe({
      next: () => {
        this.sending = false;
        this.success = true;
      },
      error: () => {
        this.sending = false;
        this.error = this.lang.t('contact.error');
      },
    });
  }
}