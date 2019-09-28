import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import {AuthService} from './auth.service'
@Injectable({providedIn: 'root'})
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler){
    const token = this.authService.getToken();
    let authtoken =token;
    if(token==undefined){
      authtoken = "Unknown"
    }
    const authRequest = req.clone({
      headers: req.headers.set("Authorization",authtoken).set('Content-Type','application/json')
    })

    return next.handle(authRequest);
  }
}
