import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CommonService } from '../../../../service/common.service';  //引入common服务
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public userInfo:any = {
    username:'',
    password: '',
    email:''
  }
  public pwshow:boolean;
  public pwshow2:boolean;
  public confirmPassword:string='';

  constructor(private router:Router, public common:CommonService, public authService: AuthService) { }

  ngOnInit() {
  }

  submit(){
    let api='http://localhost:3009/users';

    //post方法
    // this.common.post(api,this.userInfo)
    // .then((response:any)=>{
    //   console.log(response);
    //   this.router.navigate(['user/login']);
    //   alert('Signup was successful!');
    // });
    console.log('sign up works');
    this.authService.signUp(this.userInfo).subscribe((res) => {
      console.log(res);
      if (res) {
        console.log(res);
        alert('Signup was successful!');
        this.router.navigate(['user/login']);
      }
    });
  }

  verifyEmail(){
    let reg=/^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i;
    return (reg.test(this.userInfo.email));
  }
  verifyPassword(){
    let reg=/^.{6,}$/;
    return (reg.test(this.userInfo.password));
  }
  verifyConfirmPassword(){
    let reg=/^.{6,}$/;
    return (reg.test(this.userInfo.password));
  }

}
