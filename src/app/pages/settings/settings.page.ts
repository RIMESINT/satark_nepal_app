import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private nav: NavController, private router: Router) { }

  logout() {
    this.router.navigate(['/login'], {replaceUrl: true});
    localStorage.setItem('isLoggedIn','loggedOut');
  }

  ngOnInit() {
  }

}
