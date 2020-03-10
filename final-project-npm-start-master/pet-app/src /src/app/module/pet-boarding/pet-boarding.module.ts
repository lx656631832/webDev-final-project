import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';  //use binding data service
import { NzButtonModule } from 'ng-zorro-antd/button'; //import nz module
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule } from 'ng-zorro-antd'; //input ngzorro module

import { PetBoardingRoutingModule } from './pet-boarding-routing.module';
import { PetBoardingComponent } from './pet-boarding.component';
import { BlistComponent } from './components/blist/blist.component';
import { BdetailsComponent } from './components/bdetails/bdetails.component';
import { BnewComponent } from './components/bnew/bnew.component';
import { BsearchComponent } from './components/bsearch/bsearch.component';


@NgModule({
  declarations: [PetBoardingComponent, BlistComponent, BdetailsComponent, BnewComponent, BsearchComponent],
  imports: [
    CommonModule,
    PetBoardingRoutingModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NgZorroAntdModule
  ]
})
export class PetBoardingModule { }
