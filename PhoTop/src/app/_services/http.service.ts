import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { Photo } from '../_models/photo';
import { Post } from '../_models/post';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getPhotos(): Observable<Photo[]> {
        return this.http.get<Photo[]>('http://localhost:8090/photos');
    }

    getPhotosBetweenDate(fromDate: NgbDate, toDate: NgbDate): Observable<Photo[]> {
        const url: string = 'http://localhost:8090/photos/' + fromDate.year + '-' + fromDate.month + '-' + fromDate.day + '/'
            + toDate.year + '-' + toDate.month + '-' + toDate.day + '/';
        return this.http.get<Photo[]>(url);
    }

    getPhoto(): Observable<Photo> {
        return this.http.get<Photo>('http://localhost:8090/photos/1');
    }

    getPost(): Observable<Post> {
        return this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
    }

}
