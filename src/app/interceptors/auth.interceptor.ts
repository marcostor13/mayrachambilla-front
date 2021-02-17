import { Injectable } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AngularFireAuth) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.idToken.pipe(
      take(1),
      switchMap(idToken => {
        // console.log(idToken)
        let clone = request.clone()
        if (idToken) {          
          clone = clone.clone({ headers: request.headers.set('Authorization', 'Bearer ' + idToken) });
        }
        return next.handle(clone)
      })
    )
  }
}

export const AuthTokenHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}