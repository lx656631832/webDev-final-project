import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  public currentUser:any;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    console.log("profile's id");
    console.log(this.authService.currentUser._id);
  }

}
