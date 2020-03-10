import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';  //use binding data service
import { NzButtonModule } from 'ng-zorro-antd/button'; //import nz module
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgZorroAntdModule } from 'ng-zorro-antd'; //input ngzorro module

import { PetSittingRoutingModule } from './pet-sitting-routing.module';
import { PetSittingComponent } from './pet-sitting.component';
import { SdetailsComponent } from './components/sdetails/sdetails.component';
import { SlistComponent } from './components/slist/slist.component';
import { SsearchComponent } from './components/ssearch/ssearch.component';

@NgModule({
  declarations: [PetSittingComponent, SdetailsComponent, SlistComponent,  SsearchComponent],
  imports: [
    CommonModule,
    PetSittingRoutingModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NgZorroAntdModule
  ]
})
export class PetSittingModule { }
