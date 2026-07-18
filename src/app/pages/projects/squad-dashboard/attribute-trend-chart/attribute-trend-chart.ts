import { Component, input } from '@angular/core';

import { AttributeRow } from '../../../../shared/models/squad-data.model';

@Component({
  selector: 'app-attribute-trend-chart',
  imports: [],
  templateUrl: './attribute-trend-chart.html',
  styleUrl: './attribute-trend-chart.scss',
})
export class AttributeTrendChart {
  readonly data = input.required<AttributeRow[]>();

  // TODO: player picker (data() has one row per player per loaded_at) +
  // line chart of a chosen attribute across loaded_at for that player.
}
