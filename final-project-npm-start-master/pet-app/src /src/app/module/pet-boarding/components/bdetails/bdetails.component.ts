import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../service/common.service';  //引入common服务
import {ActivatedRoute} from '@angular/router';
import { MessageService } from '../../../../service/message.service';  //引入发送消息的message服务
import { Subscription } from 'rxjs';
import * as  differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import { AuthService } from 'src/app/service/auth.service';
//日历插件所需要的全局申明
declare let $;
declare let moment;

@Component({
  selector: 'app-bdetails',
  templateUrl: './bdetails.component.html',
  styleUrls: ['./bdetails.component.scss']
})
export class BdetailsComponent implements OnInit {

   public item:any[]=[];
   public petTypes:any[];
   subscription: Subscription;
   msg:any;
   today:Date = new Date();
   sitterStart:Date = new Date("12/10/2019");
   sitterEnd:Date = new Date("12/20/2019");
   currentUserid:string;
   currentUser:any;
   username:string;
   public id:string;


  constructor(public router:ActivatedRoute, public common:CommonService, private message:MessageService, private authService:AuthService) { 
    
  }

  ngOnInit() {
    this.router.params.subscribe((value:any)=>{
      console.log(value);
      this.requestContent(value.id);
      this.id=value.id;
    })

    // this.subscription = this.message.getMessage().subscribe(
    //   msg => {
    //     // 根据 msg 来处理你的业务逻辑
    //     console.log("this is the message: ");
    //     console.log(msg);
    //     this.msg = msg;
    //     console.log(this.msg);
    //   })
    this.msg = this.message.getMessage();
    console.log("Message:");
    console.log(this.msg);

    this.dateRangePicker("timeInput");
    
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
}

  requestContent(id){
    //请求数据
    this.currentUser = this.authService.currentUser;
    var userid=this.authService.currentUser._id;
    this.currentUserid = userid;
    let api='http://localhost:3009/users/'+userid+'/poster/'+id;
    this.common.get(api).then((response:any)=>{
      console.log(response);
      this.item = response;
      console.log("item:"+this.item);
      this.petTypes=response.petTypes;
      this.username=response.name;
      var start= this.formatDateTime(response.startTime);
      var end= this.formatDateTime(response.endTime);
      // var start=response.startTime.format('MM/DD/YYYY');
      // var end=response.endTime.format('MM/DD/YYYY');
      console.log(start);
      console.log(end);
      this.sitterStart=new Date(Date.parse(start));
      this.sitterEnd=new Date(Date.parse(end));
      console.log(this.sitterStart);
      console.log(this.sitterEnd);
    })
  }

  confirm(){
    this.currentUser = this.authService.currentUser;
    var userid=this.authService.currentUser._id;
    this.currentUserid = userid;
    let api='http://localhost:3009/users/'+userid+'/poster/'+this.id;
    let status = {
      "status": "confirmed",
      "confirmedUserId": userid,
      "confirmedUsername": this.currentUser.username,
      "confirmedEmail": this.currentUser.email
    };
    this.common.put(api,status).then((response:any)=>{
      console.log(response);
      alert("Confirm successfully!");
      this.ngOnInit();
    })
  }

  addZero(num) {
    return num < 10 ? '0' + num : num;
} 

  formatDateTime (date) {
            var time = new Date(Date.parse(date));
            time.setTime(time.setHours(time.getHours() + 8));
            var Y = time.getFullYear() + '-';
            var  M = this.addZero(time.getMonth() + 1) + '-';
            var D = this.addZero(time.getDate()) + ' ';
            var h = this.addZero(time.getHours()) + ':';
            var m = this.addZero(time.getMinutes()) + ':';
            var  s = this.addZero(time.getSeconds());
            return Y + M + D;
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
        // startDate: moment().subtract(7, 'days'),
        // endDate: moment()
        startDate: obj.msg[0],
        endDate: obj.msg[1]
        
      };
    picker.daterangepicker(dataRageOption, function (start, end, label) {
      console.info(`start:${start.format('MM/DD/YYYY')}, end:${end.format('MM/DD/YYYY')}, label:${label}`);
    });

  }

}
