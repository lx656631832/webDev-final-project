import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService, private router: Router) { }
  title = 'pet-app';
  logout() {
    this.auth.logout();
    this.router.navigate(['home']);
  }
  goProfile(){
    let currentUser = this.auth.currentUser;
    console.log(currentUser._id);
    this.router.navigate(['user/profile/' + currentUser._id]);
  }
}
