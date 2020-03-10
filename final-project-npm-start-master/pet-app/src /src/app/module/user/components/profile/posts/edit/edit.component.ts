import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../../../service/common.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public petTypeList:Array<{ label: string; value: string }> = [{label:'Dog',value:'Dog'},{label:'Cat',value:'Cat'},{label:'Hamster',value:'Hamster'},{label:'Rabbit',value:'Rabbit'},{label:'Snake',value:'Snake'}];
  postType:string="boarding";
  post:boolean=true;
  startDate:Date;
  endDate:Date;
  price:number;
  listOfSelectedPetType:string[];
  inputComment:string;
  address:string;
  petSelected:any;
  postId:string;
  currentUser:any;
  item:any;
  petlist:any[]=[];


  constructor(public common:CommonService,public router:ActivatedRoute,public r:Router, private authService:AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUser;
    this.router.params.subscribe((value:any)=>{
      console.log(value);
      this.requestContent(value.id);
      this.postId=value.id;
    })
    this.getPetList();
  }

  getPetList(){
    let api='http://localhost:3009/users/'+this.authService.currentUser._id+'/pets';   //测试api
    this.common.get(api).then((response:any)=>{
      console.log(response);
      this.petlist=response;
      console.log(this.petlist);
    })
  }

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
    this.startDate = result[0];
    this.endDate = result[1];
    console.log(this.startDate);
    console.log(this.endDate);
  }

  formatterDollar = (value: number) => `$ ${value}`;
  parserDollar = (value: string) => value.replace('$ ', '');

  requestContent(id){
    //请求数据
    let api = 'http://localhost:3009/users/'+this.currentUser._id+'/poster/'+id;
    this.common.get(api).then((response:any)=>{
      console.log(response);
      this.item = response;
      this.postType=response.type;
      this.listOfSelectedPetType=response.petTypes;
      this.startDate=response.startTime;
      this.endDate=response.endTime;
      this.inputComment=response.description;
      this.price=response.price;
      this.address=response.address;
      this.petSelected=response.pet;
    })
  }

  update(){
    var userid=this.authService.currentUser._id;
    let api = 'http://localhost:3009/users/'+this.currentUser._id+'/poster/'+this.postId;
    let poster = {
      type: this.postType,
      petTypes: this.listOfSelectedPetType,
      startTime: this.startDate,
      endTime: this.endDate,
      description: this.inputComment,
      price: this.price,
      address: this.address,
      pet:this.petSelected
    };
    this.common.post(api,poster).then((response:any)=>{
      console.log(response);
      alert("New post submitted successfully!");
      this.r.navigate(['user/profile/'+this.currentUser._id+'/posts/plist']);
    })
  }

  back(){
    this.r.navigate(['user/profile/'+this.currentUser._id+'/posts']);
  }

}
