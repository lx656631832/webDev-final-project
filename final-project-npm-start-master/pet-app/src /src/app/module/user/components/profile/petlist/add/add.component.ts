import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from '../../../../../../service/common.service'
import { Router} from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  pet:any[]=[];
  NickName: String;
  Gender: String='female';
  Type: String;
  Age: Number;
  public petTypeList:Array<{ label: string; value: string }> = [{label:'Dog',value:'Dog'},{label:'Cat',value:'Cat'},{label:'Hamster',value:'Hamster'},{label:'Rabbit',value:'Rabbit'},{label:'Snake',value:'Snake'}];
  public currentUser:any;
  
  constructor(public common:CommonService,public router:Router,public authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;

  }


  addPet(){
    let api='http://localhost:3009/users/'+this.currentUser._id+'/pets';   //测试api
    let pet = {
      host: this.currentUser._id,
      nickName: this.NickName,
      gender: this.Gender,
      petType: this.Type,
      age: this.Age
    }
    this.common.post(api,pet).then((response:any)=>{
      console.log(response);
      alert("Pet Added Successfully!");
      this.router.navigate(['user/profile/'+this.currentUser._id+'/petlist']);
    })
    
  }

  back(){
    this.router.navigate(['user/profile/'+this.currentUser._id+'/petlist']);
  }
  


  
  

}
