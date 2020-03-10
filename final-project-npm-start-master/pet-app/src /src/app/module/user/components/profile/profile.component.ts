import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isCollapsed = false;
  currentUser:any={};
  constructor(public authService: AuthService, private actRoute: ActivatedRoute) { 
    // const id = authService.currentUser._id;
    // console.log("profile's id");
    // console.log(authService.currentUser._id);
    // this.authService.getUserProfile(id).subscribe(res => {
    //   console.log(res.msg);
    //   this.currentUser = res.msg;
    // });
  }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    console.log("profile's id");
    console.log(this.authService.currentUser._id);
  }

}
