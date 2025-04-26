import { Component, inject } from '@angular/core';
import { MedService } from '../services/med/med.service';
import { Med } from '../shared/models/Med';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { TagsComponent } from '../tags/tags.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, SearchComponent, TagsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  meds:Med[] = [];
  private medService = inject(MedService);
  private route = inject(ActivatedRoute);

  constructor() {
    this.meds = this.medService.getAll();

    this.route.params.subscribe(params => {
      if(params['searchTerm']) {
        this.meds = this.medService.getAll().filter(med => 
          med.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      }
      else if(params['tag']) {
        this.meds = this.medService.getAllMedsByTag(params['tag']);
      }
      else {
        this.meds = this.medService.getAll();
      }
    })
  }
}
