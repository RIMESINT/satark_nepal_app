import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoginPage } from './pages/login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  session = "loggedOut";

  constructor( private platform: Platform, private router: Router, public nav: NavController) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      // this.screenOrientation.lock('portrait');
      console.log("app started");
      this.session = localStorage.getItem('isLoggedIn');
      console.log("session..", this.session);
      if(this.session === "loggedIn"){
        // this.user_id = localStorage.getItem('user_id');
        // this.username = localStorage.getItem('username');
        // this.useremail = localStorage.getItem('useremail');
        // console.log("user id...", this.user_id);
        // this.router.navigateByUrl('/tabs/lightning-home');
        this.nav.navigateRoot(['tabs']);
      } else {
        // this.router.navigateByUrl('/login');
        this.router.navigate(['/login'], {replaceUrl: true});
      }
    });
  }
}
