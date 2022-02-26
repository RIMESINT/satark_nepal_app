import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private nav: NavController, private router: Router) { }

  login(){
    this.nav.navigateRoot(['tabs']);
    localStorage.setItem('isLoggedIn','loggedIn');
  }

  ngOnInit() {
  }

}
