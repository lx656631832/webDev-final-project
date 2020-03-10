import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../service/common.service';  //引入common服务
import { MessageService } from '../../../../service/message.service';  //引入发送消息的message服务
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { UserService } from 'src/app/service/user.service';

//日历插件所需要的全局申明
declare let $;
declare let moment;

@Component({
  selector: 'app-blist',
  templateUrl: './blist.component.html',
  styleUrls: ['./blist.component.scss']
})
export class BlistComponent implements OnInit {
  public postlist:any[]=[];
  public boardinglist:any[]=[];   //用于存放list
  public user:any;

  public startDate:string;
  public endDate:string;
  public price:number=150;
  public petTypeList:string[] = ['Dog','Cat','Hamster','Rabbit','Snake'];
  public petType:string;
  public searchResult:any[];
  public show:boolean = true;

  public data:any[] = [
    {title : 'title1', href:'link1', description:'description1', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', content:'This is the content'},
    {title : 'title2', href:'link2', description:'description2', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', content:'This is the content'},
    {title : 'title3', href:'link3', description:'description3', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', content:'This is the content'},
    {title : 'title4', href:'link4', description:'description4', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', content:'This is the content'},
    {title : 'username', href:'link5', description:'50 per day', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', content:'This is the address'}

  ];


  constructor(public common:CommonService, private message:MessageService, private router:Router, private User:UserService) { 
    
  }

  ngOnInit() {
    // let api='http://localhost:3000/todos';   //测试api
    let api1='http://localhost:3009/posters';   //正式api
    this.common.get(api1).then((response:any)=>{
      console.log(response);
      this.postlist=response;
      console.log(this.postlist);
      this.initboarding();
    })
    
    this.dateRangePicker("timeInput");
  }

  initboarding(){
    for(let item of this.postlist){
      if(item.type=="sitting"){
        this.boardinglist.push(item);
      }
    }
    console.log(this.boardinglist);
    console.log(this.boardinglist[2].user);
  }

  getUserName(userid){
    console.log("getuserid"+userid);
    this.User.get(userid);
    var username = this.User.targetUser.username;
    return username;
  }

  setPrice(){
    console.log(this.price);
  }

  search(){
    this.message.clearMessage();
    console.log("Search Event");
    console.log(this.startDate);
    this.message.sendMessage(this.startDate);
    this.message.sendMessage(this.endDate);
    console.log("Message sent");

    
    var tempList:any[] = this.boardinglist;
    var tempList1:any[] = [];
    var tempList2:any[] = [];
    var tempList3:any[] = [];
    console.log("templist"+tempList);

    for (var i = 0; i < tempList.length; i++){
      for(let pettype of tempList[i].petTypes){
        if(pettype == this.petType){
          tempList1.push(tempList[i]);
        }
    }
  }
    console.log("templist1"+tempList1);
    if(tempList1.length>0){
      tempList = tempList1;
    }

    for (var i = 0; i < tempList.length; i++){
      if(this.price<=tempList[i].price){
        tempList2.push(tempList[i])
      }
    }
    if(tempList2.length>0){
      tempList = tempList2;
    }

    for (var i = 0; i < tempList.length; i++){
      if(this.startDate>=tempList[i].startTime && this.endDate<=tempList[i].endTime){
        tempList3.push(tempList[i])
      }
    }
    if(tempList3.length>0){
      tempList = tempList3;
    }


    console.log(tempList);
    this.searchResult=tempList;
    this.show = false;
  }

  addPost(){
    this.router.navigate(['petboarding/new']);
  }

     
  dateRangePicker(id) {
    const obj: any = this;
    const locale = {
      "format": 'MM/DD/YYYY',
      "separator": " - ",
      "applyLabel": "Confirm",
      "cancelLabel": "Cancel",
      "fromLabel": "From",
      "toLabel": "To'",
      "customRangeLabel": "自定义",
      "weekLabel": "W",
      "daysOfWeek": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      "monthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jue", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      "firstDay": 1
    };
    let picker: any = $('#' + id);
    let dataRageOption: Object =
      {
        'locale': locale,
        
        //汉化按钮部分
        // ranges: {
        //   '今日': [moment(), moment()],
        //   '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        //   '最近7日': [moment().subtract(6, 'days'), moment()],
        //   '最近30日': [moment().subtract(29, 'days'), moment()],
        //   '本月': [moment().startOf('month'), moment().endOf('month')],
        //   '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        // },
        startDate: moment(),
        endDate: moment().add(7, 'days')
        
      };
    picker.daterangepicker(dataRageOption, function (start, end, label) {
      console.info(`start:${start.format('MM/DD/YYYY')}, end:${end.format('MM/DD/YYYY')}, label:${label}`);
      var startDate = start.format('MM/DD/YYYY');
      var endDate = end.format('MM/DD/YYYY');
      console.log(start.format('MM/DD/YYYY'));
      console.log(obj.startDate);

      obj.startDate = new Date(Date.parse(startDate));
      obj.endDate = new Date(Date.parse(endDate));
      console.log(obj.startDate);
      console.log(obj.endDate);
      var curTime = new Date();
      console.log(curTime >= obj.startDate && curTime <= obj.endDate);
    });

  }

  formatter(value: number): string {
    return `$${value}`;
  }

}
