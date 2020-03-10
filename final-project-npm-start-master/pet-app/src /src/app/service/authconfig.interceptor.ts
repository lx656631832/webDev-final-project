import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth.service';
 
@Injectable()
 
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }
 
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // 获取JWT令牌
    const authToken = this.authService.getToken();
    // 设置Authorization标头
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken
      }
    });
    return next.handle(req);
  }
}