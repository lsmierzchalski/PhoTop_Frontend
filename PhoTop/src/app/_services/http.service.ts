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

    // getPhotos(): Observable<Array<any>> {
    // tslint:disable-next-line:max-line-length
    //     const auth_token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNla3BrIiwiQWRtaW4iOjI0LCJleHAiOjE1MzgyMTczMDR9.NVA05SikeOS19W3w619NTi-IiAw44h1UpvapbSNgxmpE3zFOCxcUCG2pu1Kda-wZxRmvHQloBXuq5cw5hWPIXQ';
    //     const headers = new Headers({
    //     'Content-Type': 'application/json',
    //     'Authorization': auth_token
    //     })
    //     return this.http.get<Array<any>>(`${environment.photopApiUrl}/photos`, { headers });
    // }

    // getPhoto(): Observable<any> {
        // tslint:disable-next-line:max-line-length
    //     const auth_token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNla3BrIiwiQWRtaW4iOjI0LCJleHAiOjE1MzgyMTczMDR9.NVA05SikeOS19W3w619NTi-IiAw44h1UpvapbSNgxmpE3zFOCxcUCG2pu1Kda-wZxRmvHQloBXuq5cw5hWPIXQ';
    //     const headers = new Headers({
    //     'Content-Type': 'application/json',
    //     'Authorization': auth_token
    //     });
    //     return this.http.get<Array<any>>(`${environment.photopApiUrl}/photos/1`, { headers });
    // }

    // getPhoto(): string {
    //     const myHeaders = new Headers();
    // tslint:disable-next-line:max-line-length
    //     myHeaders.append('Authorization', 'Bearer Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNla3BrIiwiQWRtaW4iOjI0LCJleHAiOjE1MzgyMTczMDR9.NVA05SikeOS19W3w619NTi-IiAw44h1UpvapbSNgxmpE3zFOCxcUCG2pu1Kda-wZxRmvHQloBXuq5cw5hWPIXQ');

    //     return this.http.get(`${environment.photopApiUrl}/photos/1`);
    // }

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
