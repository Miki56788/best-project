import { Component, inject, Input} from '@angular/core';
import { Tag } from '../shared/models/Tag';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MedService } from '../services/med/med.service';

@Component({
  selector: 'app-tags',
  imports: [ CommonModule, RouterModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {

  @Input()
  medPageTags?:string[];
  tags:Tag[] = [];
  private medService = inject(MedService)

  constructor() {
    if(!this.medPageTags) {
      this.tags = this.medService.getAllTags();
    }
  }

}
