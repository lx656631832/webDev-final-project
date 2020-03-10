import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../../../service/common.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-petedit',
  templateUrl: './petedit.component.html',
  styleUrls: ['./petedit.component.scss']
})
export class PeteditComponent implements OnInit {
  public item:any;
  NickName: String;
  Gender: String;
  Type: String;
  Age: Number;
  petId:any;
  public petTypeList:Array<{ label: string; value: string }> = [{label:'Dog',value:'Dog'},{label:'Cat',value:'Cat'},{label:'Hamster',value:'Hamster'},{label:'Rabbit',value:'Rabbit'},{label:'Snake',value:'Snake'}];
  public currentUser:any;

  constructor(public common:CommonService,public router:ActivatedRoute,public r:Router, public authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.router.params.subscribe((value:any)=>{
      console.log(value);
      this.requestContent(value.id);
      this.petId=value.id;
    })
  }

  requestContent(id){
    //请求数据
    let api = 'http://localhost:3009/users/'+this.currentUser._id+'/pets/'+id;
    this.common.get(api).then((response:any)=>{
      console.log(response);
      this.item = response;
      console.log("list"+this.item);
      this.NickName=response.nickName;
      this.Gender=response.gender;
      this.Type=response.petType;
      this.Age=response.age;
      
    })
  }

  updatePet(){

    let api='http://localhost:3009/users/'+this.currentUser._id+'/pets/'+this.petId;
    let pet = {
      nickName: this.NickName,
      gender: this.Gender,
      petType: this.Type,
      age: this.Age
    }
    this.common.put(api,pet).then((response:any)=>{
      console.log(response);
      alert("Updated Successfully!")
      this.r.navigate(['user/profile/'+this.currentUser._id+'/petlist']);
    })
  }

  back(){
    this.r.navigate(['user/profile/'+this.currentUser._id+'/petlist']);
  }

}
