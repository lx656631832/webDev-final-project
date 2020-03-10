import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CommonService } from 'src/app/service/common.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-bnew',
  templateUrl: './bnew.component.html',
  styleUrls: ['./bnew.component.scss']
})
export class BnewComponent implements OnInit {

  public petTypeList:Array<{ label: string; value: string }> = [{label:'Dog',value:'Dog'},{label:'Cat',value:'Cat'},{label:'Hamster',value:'Hamster'},{label:'Rabbit',value:'Rabbit'},{label:'Snake',value:'Snake'}];
  postType:string="boarding";
  post:boolean=true;
  startDate:Date;
  endDate:Date;
  price:number=10;
  listOfSelectedPetType:string[];
  inputComment:string;
  address:string;
  petSelected:any;
  petlist:any[]=[];
  
  constructor(private router:Router, private common:CommonService, private authService:AuthService) { }

  ngOnInit() {
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

  onPostTypeChange(e:any){
    if(this.postType == "boarding"){
      this.post=true;
    }else if(this.postType == "sitting"){
      this.post=false;
    }
  }

  cancel(){
    this.router.navigate(['petboarding']);
  }
  submit(){
    //post
    var userid=this.authService.currentUser._id;
    var username=this.authService.currentUser.username;
    let api='http://localhost:3009/users/'+userid+'/poster';
    let poster = {
      user: userid,
      name: username,
      type: this.postType,
      petTypes: this.listOfSelectedPetType,
      startTime: this.startDate,
      endTime: this.endDate,
      description: this.inputComment,
      price: this.price,
      address: this.address,
      pet:this.petSelected,
      confirmedUserId:'default',
      confirmedUsername:'default',
      confirmedEmail:'default'
    };
    this.common.post(api,poster).then((response:any)=>{
      console.log(response);
      alert("New post submitted successfully!");
      this.router.navigate(['petboarding']);
    })
  }

}
