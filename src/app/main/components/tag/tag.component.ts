import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../../rest/search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  public tag: string;

  constructor(private searchService: SearchService,
              private router: Router) { }

  ngOnInit() {
    this.tag = this.router.url.slice(8);

    this.searchService.getTagByName(this.tag).subscribe((response) => {
      console.log(response);
    });
  }
}
