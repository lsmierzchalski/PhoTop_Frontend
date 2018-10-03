import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { Photo } from '../_models/photo';
import { Post } from '../_models/post';
import { User } from '../_models/user';
import { User2 } from '../_models/user2';

import { Tag } from '../_models/tag';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getUser(user_id: number): Observable<User2> {
        return this.http.get<User2>(`${environment.photopApiUrl}users/24`);
    }

    getUser2(): Observable<User2> {
        return this.http.get<User2>(`${environment.photopApiUrl}users/2`);
    }

    getUser3() {
        this.http.get(`${environment.photopApiUrl}users/2`)
        .subscribe(photos => {
            console.log(photos);
        });
    }

    getUser4() {
        this.http.get<User2>(`${environment.photopApiUrl}users/2`);
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

    getTag(): Observable<Tag> {
        return this.http.get<Tag>(`${environment.photopApiUrl}tags/1`);
    }

    getTag2(): Observable<any> {
        return this.http.get<any>(`${environment.photopApiUrl}tags/1`);
    }

    getPost(): Observable<Post> {
        return this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
    }

    register(user: User) {
        return this.http.post(`${environment.photopApiUrl}users/sign`, user);
    }

    addPhoto(title: string, description: string, file_path: string) {
        const url = `${environment.photopApiUrl}photos`;
        // tslint:disable-next-line:max-line-length
        return this.http.post<any>(url, { title: title, file_path: file_path, description: description});
    }

    getUserPhotos(user_id: number): Observable<Photo[]> {
        const url: string = environment.photopApiUrl + 'photos/' + user_id;
        return this.http.get<Photo[]>(url);
    }
}
