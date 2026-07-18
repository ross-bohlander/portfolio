import { Component, input } from '@angular/core';

import { NationalityRow } from '../../../../shared/models/squad-data.model';

@Component({
  selector: 'app-nationality-chart',
  imports: [],
  templateUrl: './nationality-chart.html',
  styleUrl: './nationality-chart.scss',
})
export class NationalityChart {
  readonly data = input.required<NationalityRow[]>();

  // TODO: wire up a ng2-charts <canvas baseChart> (pie or bar) keyed off data().
}
