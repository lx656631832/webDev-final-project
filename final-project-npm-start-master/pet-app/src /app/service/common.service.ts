//用于存放http方法的增删查改

import { Injectable } from '@angular/core';

import { HttpClient,HttpHeaders } from '@angular/common/http';  //引入http

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http:HttpClient) { }

  //get方法
  get(api){
    return new Promise((resolve,reject)=>{
      this.http.get(api).subscribe((response)=>{
        resolve(response);
      })
    })
  }

  //post方法
  post(api,object){
    //手动设置请求的类型
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return new Promise((resolve, reject)=>{
      this.http.post(api,object,httpOptions).subscribe((response)=>{
        resolve(response);
      })
    })
    
  }
  
  //delete方法
  delete(api){
    return new Promise((resolve,reject)=>{
      this.http.delete(api).subscribe((response)=>{
        resolve(response);
      })
    })
  }

  //put方法
  put(api,object){
    const httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
    return new Promise((resolve, reject)=>{
      this.http.put(api,object,httpOptions).subscribe((response)=>{
        resolve(response);
      })
    })
  }


}
