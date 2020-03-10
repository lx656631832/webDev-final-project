import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';  //引入http
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  targetUser:any = {};

  constructor(public http:HttpClient) { }

  endpoint = 'http://localhost:3009';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  get(userid){
    this.getUserProfile(userid).subscribe((res) => {
    this.targetUser = res;
    console.log("User service");
    console.log(this.targetUser);
  });
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
