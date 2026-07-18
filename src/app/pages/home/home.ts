import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface PipelineStep {
  label: string;
  done: boolean;
}

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly pipelineSteps: PipelineStep[] = [
    { label: 'FM export', done: true },
    { label: 'Stage', done: true },
    { label: 'Raw table', done: true },
    { label: 'dbt staging', done: true },
    { label: 'dbt marts', done: false },
    { label: 'Dashboard', done: false },
  ];
}
