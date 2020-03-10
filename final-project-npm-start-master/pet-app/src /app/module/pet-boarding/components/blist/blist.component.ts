import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../service/common.service';  //引入common服务
import { MessageService } from '../../../../service/message.service';  //引入发送消息的message服务
import { FormControl } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//日历插件所需要的全局申明
declare let $;
declare let moment;

@Component({
  selector: 'app-blist',
  templateUrl: './blist.component.html',
  styleUrls: ['./blist.component.scss']
})
export class BlistComponent implements OnInit {

  public boardinglist:any[]=[];   //用于存放list

  public startDate:string;
  public endDate:string;
  public price:number=150;
  public petTypeList:string[] = ['Dog','Cat','Hamster','Rabbit','Snake'];
  public petType:string;
  public searchResult:any[];

  public data:any[] = [
    {title : 'title1', href:'link1', description:'description1', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', content:'This is the content'},
    {title : 'title2', href:'link2', description:'description2', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', content:'This is the content'},
    {title : 'title3', href:'link3', description:'description3', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', content:'This is the content'},
    {title : 'title4', href:'link4', description:'description4', avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', content:'This is the content'}


  ];


  constructor(public common:CommonService, private message:MessageService) { 
    
  }

  ngOnInit() {
    let api='http://localhost:3000/todos';   //测试api
    this.common.get(api).then((response:any)=>{
      console.log(response);
      this.boardinglist=response;
      console.log(this.boardinglist);
    })
    
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

    
    var tempList:any[] = [];
    
    for(let item of this.boardinglist){
      if(this.petType==item.type){
        tempList.push(item)
      }
    }
    if(tempList.length>0){
      this.boardinglist = tempList;
      tempList=[];
    }

    for(let item of this.boardinglist){
      if(this.price<=item.price){
        tempList.push(item)
      }
    }
    if(tempList.length>0){
      this.boardinglist = tempList;
      tempList=[];
    }


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
      obj.startDate = start.format('MM/DD/YYYY');
      obj.endDate = end.format('MM/DD/YYYY');
      console.log(start.format('MM/DD/YYYY'));
      console.log(obj.startDate);
    });

  }

  formatter(value: number): string {
    return `$${value}`;
  }

}
