import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  //use binding data service

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonService } from './service/common.service';
import { MessageService } from './service/message.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipePipe } from './pipe/search-pipe.pipe';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    SearchPipePipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  providers: [CommonService,MessageService, { provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
