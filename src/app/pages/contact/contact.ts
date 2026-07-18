import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mdaqggwe';

interface ContactLink {
  icon: string;
  label: string;
  href: string;
}

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly http = inject(HttpClient);
  private readonly fb = inject(FormBuilder);

  protected readonly links: ContactLink[] = [
    { icon: 'mail', label: 'ross@example.com', href: 'mailto:ross@example.com' },
    { icon: 'code', label: 'github.com/ross', href: 'https://github.com/ross' },
    { icon: 'work', label: 'linkedin.com/in/ross', href: 'https://linkedin.com/in/ross' },
  ];

  protected readonly form = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
  });

  protected readonly status = signal<SubmitStatus>('idle');

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('submitting');

    this.http
      .post(FORMSPREE_ENDPOINT, this.form.getRawValue(), {
        headers: { Accept: 'application/json' },
      })
      .subscribe({
        next: () => {
          this.status.set('success');
          this.form.reset();
        },
        error: () => this.status.set('error'),
      });
  }
}
