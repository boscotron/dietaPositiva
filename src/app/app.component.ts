import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, MenuController, NavController,ToastController, AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SplitPane } from '../providers/split-pane';
import { jmyapis } from '../providers/jmyapis';
import { jmyfatkit } from '../providers/jmy-fat-kit';
import { Welcome } from '../pages/welcome/welcome';
import { ModuloPage } from '../pages/modulo/modulo';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {  
  @ViewChild(Nav) nav: Nav;

  public empresas : any;
  public empresasApis : any;
  public nomUsuario : any;
  public nombreEmpresa:any;
  divs = {"empresa":false,
          "editarPerfil":false
        };
  rootPage:any = Welcome;
  pages: Array<{title: string, component: any, icon: any, api: any}>;
  pagesView: Array<{title: string, component: any, icon: any}>;
  nuevoMenu:  any[] = [];
  formulario={
          "idEmpresa":""
  };

  constructor(  platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public app: App, public splitPane: SplitPane, public menu: MenuController,public toastCtrl: ToastController, public jmyApis: jmyapis,public alertCtrl: AlertController,public jmyFatKit: jmyfatkit) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
     var data = JSON.parse(localStorage.getItem('userData'));

     /* enlistarr los modulos disponibles den esta app */
     this.pages = [{ 
        title: 'Inicio (Blog)', 
        component: Welcome, 
        icon: "apps",
        api: null
      },{ 
        title: 'Modulo', 
        component: ModuloPage, 
        icon: "contact",
        api: null  
      },{ 
        title: 'Modulo', 
        component: ModuloPage, 
        icon: "cube",
        api: "938a6b38e5092f1ccaede78f57665fdc"  
      },{ 
        title: 'Test', 
        component: ModuloPage, 
        icon: "cube",
        api: "c7f8d7eb668bf5c72f773f581c284978"  
      },{ 
        title: 'Directorio', 
        component: ModuloPage, 
        icon: "cube",
        api: "8936a70da4c53e42de93a427d7a82fab"  
      },
    ];

    /* NO EDITAR DESDE AQUI */
    this.pagesView=[];
    this.divs.empresa=false;
    this.divs.editarPerfil=false;
     if(data!=null){
        console.log(this.pages);
        //this.pagesView=this.pages;
        this.jmyFatKit.infoUsuario();
        this.empresas = this.jmyApis.verempresas();
        this.formulario.idEmpresa=this.jmyApis.empresadefault();
        this.empresasApis = this.jmyApis.verempresasapis(this.formulario.idEmpresa);
        this.vermenu(this.formulario.idEmpresa);
        this.nombreUsuario();
        this.nombreEmpresa=this.vNE(this.formulario.idEmpresa);
      }else{
      
     }
  } 
editarPass() {
  console.log('editarPass');
    let prompt = this.alertCtrl.create({
      title: 'Cambiar Contraseña',
      message: "Por favor coloque su contrassña actual e introdusca 2 veces la nueva contraseña de al menos 5 caracteres para confirmar que sea la correcta",
      inputs: [{
          name: 'pass_ant',
          placeholder: 'Contraseña anterior',
          type: 'password'
        },{
          name: 'pass_new',
          placeholder: 'Nueva contraseña',
          type: 'password'
        },{
          name: 'pass_new_confirm',
          placeholder: 'Repita contraseña nueva',
          type: 'password'
        },],
      buttons: [{
          text: 'Cancelar',
          handler: data => {}
        },{
          text: 'Guardar',
          handler: data => {
            var us = JSON.parse(localStorage.getItem('userData'));
            if(data.pass_ant!="" && data.pass_new!="" && data.pass_new_confirm!=""  ){
              if(data.pass_new==data.pass_new_confirm ){
                if(data.pass_new!=""  ){
                    var pass = data.pass_new;
                    if(pass.length>5){
                       this.jmyFatKit.guardarPassUsuario({pass_ant:data.pass_ant,pass:pass});
                    }else{this.alerta("Al menos se requieren 5 caracteres para complemenetar tu contraseña");}
                }else{this.alerta("Las nuevas contraseñas no coinciden");}
              }else{this.alerta("Las nuevas contraseñas no coinciden");}
            }else{this.alerta("Se requieren todos los campos completos");}
          }}]});
    prompt.present();
  }
editarPerfil() {
  this.jmyFatKit.infoUsuario();
  if(this.jmyFatKit.user!=undefined){
    let prompt = this.alertCtrl.create({
      title: 'Editar perfil',
      message: "Hola ",
      inputs: [{
          name: 'nombre',
          value: this.jmyFatKit.user.nombre,
          placeholder: 'Nombre completo'
        },{
          name: 'correo',
          value: this.jmyFatKit.user.correo,
          placeholder: 'Correo electronico',
          type: 'email'
        },],
      buttons: [{
          text: 'Cancelar',
          handler: data => {
        }},{
          text: 'Guardar',
          handler: data => {
            this.jmyFatKit.guardarEditarUsuario(data);
            this.nombreUsuario();
        }}]
    });
    prompt.present();
  }else{this.alerta("Ocurrio un error al cargar los datos de perfil");this.jmyFatKit.infoUsuario();}
}
salirConfirmar() {
    let confirm = this.alertCtrl.create({
      title: 'Estas seguro',
      message: '¿que ya deseas salir?',  
      buttons: [{
          text: 'Regresar',
          handler: () => { }},{
          text: 'Salir',
          handler: () => {
            this.alerta("Hata luego! ");
            this.logout();
          }}]});
    confirm.present();
  }


 btnEditar(){
   if(this.divs.editarPerfil) this.divs.editarPerfil=false; else this.divs.editarPerfil=true;
 }
 btnEmpresa(){
   if(this.divs.empresa) this.divs.empresa=false; else this.divs.empresa=true;
 }


nombreUsuario(){const d=JSON.parse(localStorage.getItem('userData'));
  if(d!=undefined){ return(this.jmyFatKit.user!=undefined)?this.jmyFatKit.user.nombre:d.userData.name; } }

vNE(id){
  var aa=this.jmyApis.datosEmpresa(this.jmyApis.empresaactual());
  console.log(aa);
  return (aa!=undefined)? aa.nombre :"Sin empresa";
}
cambiarEmpresa(){const idEmpresa = this.formulario.idEmpresa;
  this.vermenu(idEmpresa);location.reload();
  this.nombreEmpresa=this.vNE(idEmpresa);
}

vermenu(idEmpresa){
  var h=this.pages;
  var aa=this.jmyApis.empresaapi(idEmpresa);
  this.nuevoMenu=[];
  for(var i=0;i<h.length;++i){
    var m=(h[i].api==null)?true:false;
    if(aa!=undefined&&h[i].api!=null){
      let newList=aa.filter((t)=>t==h[i].api);
      if(newList.length>0){m = true;}}
    if(m){this.nuevoMenu.push({title:h[i].title,component:h[i].component,icon:h[i].icon});}
  }
  this.pagesView=this.nuevoMenu;
}

alerta(men) {
    const toast = this.toastCtrl.create({
      message: men,
      duration: 9000,
      position: 'top'
    });
    toast.present();
   }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

get navCtrl(): NavController {
    return this.app.getRootNav();
  }
   backToWelcome(){
   const root = this.app.getRootNav();
    root.popToRoot();
  }
  logout(){
    localStorage.clear();
    this.menu.enable(false);
    this.navCtrl.push(Welcome);
    location.reload();
  }
  session(){
    return true;
  }


}
