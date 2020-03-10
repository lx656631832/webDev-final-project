import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(list: any[], filterField:string,keyword:string): any {
    if(!filterField || !keyword){
      return list;
    }
    return list.filter((item)=>{
      console.log(item);
      let val = item[filterField];
      console.log(val);
      return val >= keyword
    });
  }

}
