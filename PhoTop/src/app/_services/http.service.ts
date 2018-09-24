import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Photo } from '../_models/photo';
import { Post } from '../_models/post';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    getPhotos(): Observable<Photo[]> {
        return this.http.get<Photo[]>('http://localhost:8090/photos');
    }

    getPhoto(): Observable<Photo> {
        return this.http.get<Photo>('http://localhost:8090/photos/1');
    }

    getPost(): Observable<Post> {
        return this.http.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
    }

}
