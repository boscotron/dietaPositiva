import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AuthService } from '../providers/auth-service';
import { SplitPane } from '../providers/split-pane';
import { Common } from '../providers/common';

import { jmyapis } from '../providers/jmyapis';
import { JMYDB } from '../providers/jmydb';
import { jmyfatkit } from '../providers/jmy-fat-kit';
import { HttpModule } from "@angular/http";
import { Welcome } from '../pages/welcome/welcome';
import { Login } from '../pages/login/login';
import { Signup } from '../pages/signup/signup';
import { RepassPage } from '../pages/repass/repass';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ModuloPage } from '../pages/modulo/modulo';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MomentModule } from 'angular2-moment';
import { LinkyModule } from 'angular-linky';

@NgModule({
  declarations: [
    MyApp,
    Welcome,
    Login,
    Signup,
    RepassPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModuloPage
  ],
  imports: [
    BrowserModule,HttpModule,MomentModule,LinkyModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Welcome,
    Login,
    Signup,
    RepassPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ModuloPage
  ],
  providers: [
    StatusBar,
    SplashScreen,AuthService,SplitPane,Common,jmyapis,JMYDB,jmyfatkit,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
