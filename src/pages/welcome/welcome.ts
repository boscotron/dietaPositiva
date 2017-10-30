import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the Welcome page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class Welcome {
  slides: Slide[];
  showSkip = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
   
   if(localStorage.getItem('userData')){
     this.navCtrl.setRoot(TabsPage);
   }

   this.slides = [{
            title: "Tip #1",
            description: "Nuevo JMY 3.0 FlatKit con opciones de desarollo listas",
            image: 'assets/imgs/bananalogo.png',
          }, {
            title: "Tip #2",
            description: "Crea la APIs en nuestro portal administrador ",
            image: 'assets/imgs/bananalogo.png',
          },{
            title: "Tip #3",
            description: "Clona nuestro Git y configura",
            image: 'assets/imgs/bananalogo.png',
          },{
            title: "Tip #4",
            description: "Listo tendrás una web app lista y conectada abase de datos con soporte de usuarios ",
            image: 'assets/imgs/bananalogo.png',
          }
        ];

  }
   onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Welcome');
  }

  login(){
   this.navCtrl.push(Login);
  }

  signup(){
   this.navCtrl.push(Signup, {}, {animate:false});
  }

}
