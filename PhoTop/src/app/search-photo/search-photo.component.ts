import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../_services/http.service';
import { Photo } from '../_models/photo';

@Component({
  selector: 'app-search-photo',
  templateUrl: './search-photo.component.html',
  styleUrls: ['./search-photo.component.css']
})
export class SearchPhotoComponent implements OnInit {

  photos: Photo[];
  searchTerm: string;
  constructor(private httpService: HttpService,
    private router: Router) { }

  ngOnInit() {
    this.loadAllPhotos();
  }

  private loadAllPhotos() {
    this.httpService.getPhotos().subscribe(photos => {
      this.photos = photos;
    });
  }

}
