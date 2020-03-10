import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../../service/message.service';  //引入发送消息的message服务

//日历插件所需要的全局申明
declare let $;
declare let moment;

@Component({
  selector: 'app-bsearch',
  templateUrl: './bsearch.component.html',
  styleUrls: ['./bsearch.component.scss']
})
export class BsearchComponent implements OnInit {

  public startDate:string;
  public endDate:string;
  public price:number;
  
  constructor(private message:MessageService) { }

  ngOnInit() {
    this.dateRangePicker("timeInput");
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
        startDate: moment().subtract(7, 'days'),
        endDate: moment()
        
      };
    picker.daterangepicker(dataRageOption, function (start, end, label) {
      console.info(`start:${start.format('MM/DD/YYYY')}, end:${end.format('MM/DD/YYYY')}, label:${label}`);
      obj.startDate = start.format('MM/DD/YYYY');
      obj.endDate = end.format('MM/DD/YYYY');
      console.log(start.format('MM/DD/YYYY'));
      console.log(obj.startDate);
    });

  }


}