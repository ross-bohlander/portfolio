import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface ContactLink {
  icon: string;
  label: string;
  href: string;
}

@Component({
  selector: 'app-contact',
  imports: [MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly links: ContactLink[] = [
    { icon: 'mail', label: 'ross@example.com', href: 'mailto:ross@example.com' },
    { icon: 'code', label: 'github.com/ross', href: 'https://github.com/ross' },
    { icon: 'work', label: 'linkedin.com/in/ross', href: 'https://linkedin.com/in/ross' },
  ];

  // TODO: wire this up to an actual form-handling service (e.g. Formspree,
  // a Cloud Function) — there's no backend for this static site yet.
  protected onSubmit(): void {
    console.log('TODO: submit contact form');
  }
}
