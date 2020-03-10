import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../service/common.service';  //引入common服务
import {ActivatedRoute} from '@angular/router';
import { MessageService } from '../../../../service/message.service';  //引入发送消息的message服务
import { Subscription } from 'rxjs';

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
   subscription: Subscription;
   msg:any;

  constructor(public router:ActivatedRoute, public common:CommonService, private message:MessageService) { 
    
  }

  ngOnInit() {
    this.router.params.subscribe((value:any)=>{
      console.log(value);
      this.requestContent(value.id);
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
    var api='http://localhost:3000/todos/'+id;
    this.common.get(api).then((response:any)=>{
      console.log(response);
      this.item = response;
      console.log("list"+this.item);
    })
  }

  confirm(){
    
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
