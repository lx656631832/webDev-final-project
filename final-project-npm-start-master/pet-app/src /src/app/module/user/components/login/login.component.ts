import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CommonService } from '../../../../service/common.service';  //引入common服务
import { AuthService } from '../../../../service/auth.service';  //引入验证用户的服务
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userlist:any[]=[];   //用于存放list
  public username:string;
  public password:string;
  public pwshow:boolean;
  public error: string;


  constructor(private router:Router,public common:CommonService, private auth: AuthService) { }

  ngOnInit() {

  }

  submit(){
    


 
    //验证用户名和密码

    // this.router.navigate(['user/login']);   //跳转用户个人信息页
    this.auth.login(this.username, this.password)
      .pipe(first())
      .subscribe(
        result => {this.router.navigate(['home']); console.log("Result" + result);     alert('Log in successfully!');},
        err => this.error = 'Could not authenticate'
      );

  }

}
