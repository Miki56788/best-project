import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Med } from '../shared/models/Med';
import { MedService } from '../services/med/med.service';

@Component({
  selector: 'app-med-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './med-page.component.html',
  styleUrl: './med-page.component.scss'
})
export class MedPageComponent {

  med?: Med;
  private activatedRoute = inject(ActivatedRoute);
  private medService = inject(MedService);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.med = this.medService.getMedById(params['id']);
      }
    });
  }
}
