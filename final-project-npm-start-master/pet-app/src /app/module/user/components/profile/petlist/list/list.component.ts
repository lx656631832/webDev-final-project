import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../../../service/common.service'
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NzMessageService } from 'ng-zorro-antd';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public petlist: Array<{ loading: boolean}> = [];
  public data: any[] = [];
  initLoading = true;
  loadingMore = false;
  currentUser:any;


  constructor(public common:CommonService,public router:Router, public authService: AuthService, private nzMessageService: NzMessageService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    let api='http://localhost:3009/users/'+this.currentUser._id+'/pets';   //测试api
    this.common.get(api).then((response:any)=>{
      console.log(response);
      this.petlist=response;
      this.initLoading = false;
      console.log(this.petlist);
    })
    
  }

  deletePet(petid){
    let api = 'http://localhost:3009/users/'+this.currentUser._id+'/pets/'+petid;
    this.common.delete(api).then((response:any)=>{
      console.log(response);
    })
  }

  cancel(): void {
    this.nzMessageService.info('Cancelled');
  }

  confirm(petid): void {
    let api = 'http://localhost:3009/users/'+this.currentUser._id+'/pets/'+petid;
    this.common.delete(api).then((response:any)=>{
      console.log(response);
      this.nzMessageService.info('Deleted Successfully');
      this.router.navigate(['user/profile/'+this.currentUser._id+'/petlist']);
    })
  }

  


}
