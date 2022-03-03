import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../providers/api.service';
import { WeatherForecastDailyPage } from '../weather-forecast-daily/weather-forecast-daily.page';

@Component({
  selector: 'app-weather-forecast-home',
  templateUrl: './weather-forecast-home.page.html',
  styleUrls: ['./weather-forecast-home.page.scss'],
})
export class WeatherForecastHomePage implements OnInit {

  user_id;
  district_id;
  district_name;
  block_name;
  public day1ecmwf_data: any;
  public day4ecmwf_data: any;
  public day10ecmwf_data: any;
  public user_data: any;

  constructor(private httpClient: HttpClient, private api: ApiService,private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    private modalController: ModalController) {
    this.user_id = localStorage.getItem('user_id');
    console.log("user id...", this.user_id);
    this.get_user_detail(this.user_id);
  }


  //get 4 days ecmwf weather forecast by district id
  get_4daysecmwf_data(dis_id: string){
    let param = {
      id: dis_id
    }
    this.api.get_ecmwf_4days_data(param)
      .subscribe(data=>{
        this.day4ecmwf_data = data
        console.log("day4ecmwf_data data....", this.day4ecmwf_data);
        if(this.day4ecmwf_data.length == 0){
          this.day4ecmwf_data == null
          this.presentToast("Data not available!");
        }
      });
  }

  //get 1day ecmwf weather forecast by district id
  get_1dayecmwf_data(dis_id: string){
    let param = {
      id: dis_id
    }
    this.api.get_ecmwf_1day_data(param)
      .subscribe(data=>{
        this.day1ecmwf_data = data
        console.log("1 day ecmwf data....", this.day1ecmwf_data);
        if(this.day1ecmwf_data.length == 0){
          this.day1ecmwf_data == null
          this.presentToast("Data not available!");
        }
      });
  }

  //get user details
  get_user_detail(userid: string){
    this.loadingCtrl
      .create({
        spinner: 'bubbles',
        cssClass: 'loader-css-class',
        mode: 'ios',
        duration: 10000,
      }).then((loadingEl)=>{
        loadingEl.present();
        let param = {
          id: userid
        };
        this.api.get_user_details(param)
        .subscribe(data=>{
          this.user_data = data
          console.log("user_data....", this.user_data);
          this.district_id = this.user_data[0].district_id;
          this.district_name = this.user_data[0].district_name;
          this.block_name = this.user_data[0].block_name;
          this.get_1dayecmwf_data(this.district_id);
          this.get_4daysecmwf_data(this.district_id);
        });
        loadingEl.dismiss();
      });
  }

  async open_modal() {
    const modal = await this.modalController.create({
      swipeToClose: true,
      component: WeatherForecastDailyPage,
      componentProps: { "district_id": this.district_id },
    });
    return await modal.present();
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
  }

}
