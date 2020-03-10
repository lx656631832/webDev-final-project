import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = 'http://localhost:3009';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser:any = {};

  constructor(private http: HttpClient) { }

  // Sign-up
  signUp(user: any): Observable<any> {
    const api = `${this.endpoint}/users`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      );
  }


  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string, _id: string}>('http://localhost:3009/login', {username: username, password: password})
      .pipe(
        map(result=> {
          localStorage.setItem('access_token', result.token);
          console.log(result.token);
          console.log(localStorage);
          console.log(result);
          this.getUserProfile(result._id).subscribe((res) => {
                    this.currentUser = res;
                    console.log(this.currentUser);
                    // this.result.navigate(['user-profile/' + res.msg._id]);
                  });
          return true;
        })
      );
  }

  // signIn(user: User) {
  //   return this.http.post<any>(`${this.endpoint}/signin`, user)
  //     .subscribe((res: any) => {
  //       localStorage.setItem('access_token', res.token);
  //       this.getUserProfile(res._id).subscribe((res) => {
  //         this.currentUser = res;
  //         this.router.navigate(['user-profile/' + res.msg._id]);
  //       });
  //     });
  // }


  logout() {
    localStorage.removeItem('access_token');
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }


  // User profile
  getUserProfile(id): Observable<any> {
    const api = `${this.endpoint}/users/${id}`;
    return this.http.get(api, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
