import { HttpParams } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  searchTerm:String = "";
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.route.params.subscribe( params => {
      if ( params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    })
  }

  search():void {
    if (this.searchTerm) {
      this.router.navigateByUrl('/search/' + this.searchTerm);
    }
  }
}
