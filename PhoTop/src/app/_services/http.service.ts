import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { Photo } from '../_models/photo';
import { Post } from '../_models/post';
import { User } from '../_models/user';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getUser(user_id: number): Observable<User> {
        return this.http.get<User>(`${environment.photopApiUrl}users/${user_id}`);
    }

    getPhotos(): Observable<Photo[]> {
        return this.http.get<Photo[]>(`${environment.photopApiUrl}photos`);
    }

    getPhotosBetweenDate(fromDate: NgbDate, toDate: NgbDate): Observable<Photo[]> {
        const url: string = environment.photopApiUrl + 'photos/' + fromDate.year + '-' + fromDate.month + '-' + fromDate.day + '/'
            + toDate.year + '-' + toDate.month + '-' + toDate.day + '/';
        return this.http.get<Photo[]>(url);
    }

    getPhoto(): Observable<Photo> {
        return this.http.get<Photo>(`${environment.photopApiUrl}photos/1`);
    }

    getPost(): Observable<Post> {
        return this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
    }

    register(user: User) {
        return this.http.post(`${environment.photopApiUrl}users/sign`, user);
    }

}
