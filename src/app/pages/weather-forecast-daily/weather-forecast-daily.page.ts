import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, ModalController, Platform,NavParams } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../providers/api.service';

@Component({
  selector: 'app-weather-forecast-daily',
  templateUrl: './weather-forecast-daily.page.html',
  styleUrls: ['./weather-forecast-daily.page.scss'],
})
export class WeatherForecastDailyPage implements OnInit {

  loading = false;
  user_id;
  district_id;
  district_name;
  block_name;
  public day10ecmwf_data: any;
  constructor(private navParams: NavParams,private loadingCtrl: LoadingController, private toastCtrl: ToastController,private httpClient: HttpClient, private api: ApiService,private modalController: ModalController, private platform: Platform) { }

  //get 10days ecmwf weather forecast by district id
  get_10daysecmwf_data(dis_id: string){
    let param = {
      id: dis_id
    }
    this.api.get_ecmwf_10days_data(param)
      .subscribe(data=>{
        this.day10ecmwf_data = data
        console.log("day10ecmwf_data data....", this.day10ecmwf_data);
        if(this.day10ecmwf_data.length == 0){
          this.day10ecmwf_data == null
          this.presentToast("Data not available!");
        }
      });
  }
  

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.display();
    console.log(this.navParams.data.district_id);
    this.district_id = this.navParams.data.district_id;
    this.get_10daysecmwf_data(this.district_id);
  }

  display() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  doRefresh(event) {
    this.display();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

}
