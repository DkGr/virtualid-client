import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
          //handle your auth error or rethrow
          if (err.status === 401 || err.status === 403) {
              localStorage.removeItem("id_token");
              this.router.navigateByUrl('');
              console.error('auth error !');
          }
          return Observable.throw(err);
      }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
    const authReq = req.clone({
      setHeaders: { Authorization: 'Bearer ' + localStorage.getItem("id_token") }
    });
    return next.handle(authReq).catch(x=> this.handleAuthError(x));
  }

}
