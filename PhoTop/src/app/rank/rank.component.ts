import { Component, OnInit } from '@angular/core';
import { HttpService } from '../_services/http.service';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';

@Component({
    selector: 'app-rank',
    templateUrl: 'rank.component.html'
})
export class RankComponent implements OnInit {

    constructor(private httpSerive: HttpService) {
    }

    ngOnInit() {
        console.log('start');
        this.httpSerive.getPhotos().subscribe(post => {
            console.log(post);
          });

          this.httpSerive.getPhoto().subscribe(post => {
            console.log(post);
          });

          this.httpSerive.getPost().subscribe(post => {
            console.log(post);
          });
        console.log('stop');
    }
}
