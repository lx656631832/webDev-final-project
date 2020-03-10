import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../service/common.service';  //引入common服务
import { MessageService } from '../../../../service/message.service';  //引入发送消息的message服务
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';

//日历插件所需要的全局申明
declare let $;
declare let moment;

@Component({
  selector: 'app-slist',
  templateUrl: './slist.component.html',
  styleUrls: ['./slist.component.scss']
})
export class SlistComponent implements OnInit {
  public postlist:any[]=[];
  public sittinglist:any[]=[];
  public user:any;

  public startDate:string;
  public endDate:string;
  public price:number=150;
  public petTypeList:string[]=['Dog','Cat','Hamster','Rabbit','Snake'];
  public petType:string;
  public searchResult:any[];
  public sitterPost:any[]=[];
  public show:boolean = true;
  // public msg:any[]=[];
  // public m:string;



  constructor(public common:CommonService, private message:MessageService, private router:Router) { }

  ngOnInit() {
    let api='http://localhost:3009/posters';   //api
    this.common.get(api).then((response:any)=>{
      console.log(response);
      this.postlist=response;
      console.log(this.postlist);
      this.initsitting();
    })
    
    this.dateRangePicker("timeInput");
  }

  initsitting(){
    for(let item of this.postlist){
      if(item.type=="boarding"){
        this.sittinglist.push(item);
      }
    }
    console.log(this.sittinglist);
  }


  setPrice(){
    console.log(this.price);
  }

  sittingdetails(id:any){
    this.router.navigate(['sittinglist/:id']);
  }

  search(){
    this.message.clearMessage();
    console.log("Search Event");
    console.log(this.startDate);
    this.message.sendMessage(this.startDate);
    // this.msg=this.message.getMessage();
    // this.m=this.msg[0];
    this.message.sendMessage(this.endDate);
    console.log("Message sent");

    var tempList:any[]=[];
    for(let item of this.sitterPost){
      if(this.petType==item.type){
        tempList.push(item)
      }
    }
    if(tempList.length>0){
      this.sittinglist = tempList;
      tempList=[];
    }

    for(let item of this.sitterPost){
      if(this.price<=item.price){
        tempList.push(item)
      }
    }
    if(tempList.length>0){
      this.sittinglist = tempList;
      tempList=[];
    }

    for(let item of this.sitterPost){
      if(this.startDate>=item.startDate && this.endDate<=item.endDate){
        tempList.push(item)
      }
    }
    if(tempList.length>0){
      this.sittinglist = tempList;
      tempList=[];
    }
    this.searchResult=tempList;
    this.show=false;

  }
  
   addPost(){
    this.router.navigate(['petboarding/new']);
   }

  dateRangePicker(id){
    const obj:any=this;
    const locale={
      "format":'MM/DD/YYYY',
      "separator":"-",
      "applyLabel":"Confirm",
      "cancelLabel":"Cancel",
      "fromLabel":"From",
      "toLabel":"To",
      "customRangeLabel":"自定义",
      "weekLabel":"W",
      "daysOfWeek":["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      "monthNames": ["Jan", "Feb", "Mar", "Apr", "May", "Jue", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      "firstDay":1
    };
    let picker:any=$('#'+id);
    let dataRageOption:Object={
      'locale':locale,

      //汉化按钮部分
        // ranges: {
        //   '今日': [moment(), moment()],
        //   '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        //   '最近7日': [moment().subtract(6, 'days'), moment()],
        //   '最近30日': [moment().subtract(29, 'days'), moment()],
        //   '本月': [moment().startOf('month'), moment().endOf('month')],
        //   '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        // },

      startDate:moment(),
      endDate:moment().add(7,'days')
    };
    picker.daterangepicker(dataRageOption,function(start,end,label){
      console.info(`start:${start.format('MM/DD/YYYY')},end:${end.format('MM/DD/YYYY')},label:${label}`);
      var startDate=start.format('MM/DD/YYYY');
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

  formatter(value:number):string{
    return `$${value}`;
  }
}
