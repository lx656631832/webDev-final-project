import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';  //use binding data service
import { JwtModule } from '@auth0/angular-jwt';   //use JWT service
import { AuthService } from './service/auth.service';
import { AuthGuard } from './auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CommonService } from './service/common.service';
import { MessageService } from './service/message.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchPipePipe } from './pipe/search-pipe.pipe';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AuthInterceptor } from './service/authconfig.interceptor';

registerLocaleData(en);

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    SearchPipePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     whitelistedDomains: ['localhost:3009'],
    //     blacklistedRoutes: ['localhost:3009/users']  //api接口
    //   }
    // })
  ],
  providers: [
    CommonService,MessageService, 
    { provide: NZ_I18N, useValue: en_US },
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
