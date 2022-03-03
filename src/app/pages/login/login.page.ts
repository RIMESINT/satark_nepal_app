import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user_id;
  district_id;
  block_id;
  public user_data: any;

  constructor(private httpClient: HttpClient,private nav: NavController, private router: Router) { }

  login(){
    var url = "http://nepal-dss.rimes.int/api_mobile/api_user/users_post";
      let params = JSON.stringify({
        email: "rimes@rimes.int",
        password:"rimes123",
        extra_param: "login"
      });
      console.log("params", params);
      this.httpClient.post(url, params, { responseType: 'json'})
        .subscribe(data => {
          console.log("data posted", data);
          if(data['success']){
            this.user_data = data['result']
            console.log("user_id...",this.user_data[0].id);
            this.user_id = this.user_data[0].id;
            localStorage.setItem('user_id',this.user_id);
            this.nav.navigateRoot(['tabs']);
            localStorage.setItem('isLoggedIn','loggedIn');
          } else {
            console.log("user not fount")
          }
      });
  }

  ngOnInit() {
  }

}
