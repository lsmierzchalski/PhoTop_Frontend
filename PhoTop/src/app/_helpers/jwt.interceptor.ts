import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log('token');
        request = request.clone({
            setHeaders: {
                // tslint:disable-next-line:max-line-length
                Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqYWNla3BrIiwiQWRtaW4iOjI0LCJleHAiOjE1MzgyMTczMDR9.NVA05SikeOS19W3w619NTi-IiAw44h1UpvapbSNgxmpE3zFOCxcUCG2pu1Kda-wZxRmvHQloBXuq5cw5hWPIXQ`
            }
        });
        return next.handle(request);
    }
}
