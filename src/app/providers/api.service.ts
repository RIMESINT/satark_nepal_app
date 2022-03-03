import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  //get user details
  get_user_details(param){
    return this.httpClient.get(
      'http://nepal-dss.rimes.int/api_mobile/api_user/check_user_get?id=' + param.id
    );
  }

  ///get CDS data
  get_OverviewAjaxBlock30Min(){
    return this.httpClient.get(
      'http://nepal-dss.rimes.int/api_mobile/api_lightning/eathnetOverviewAjaxBlock30Min'
    );
  }

  //get eartnet data
  getLxAlerts() {
    return this.httpClient.get(
      'https://api.lxalerts.earthnetworks.com/CellAlerts.aspx?level=1,2,3&nwlat=37.69027&nwlon=62.69888&selat=4.50111&selon=101.033611&format=json&partnerid=B491167B-6969-4A35-893D-0FEE54C6F926'
    );
  }


  //get 10days ecmwf weather forecast by district id
  get_ecmwf_10days_data(param){
    return this.httpClient.get(
      'http://nepal-dss.rimes.int/api_mobile/api_weather/ecmwf_10days_by_district_id_get?id=' + param.id
    );
  }

  //get 1day ecmwf weather forecast by district id
  get_ecmwf_1day_data(param){
    return this.httpClient.get(
      'http://nepal-dss.rimes.int/api_mobile/api_weather/ecmwf_1day_by_district_id_get?id=' + param.id
    );
  }

  //get 4days ecmwf weather forecast by district id
  get_ecmwf_4days_data(param){
    return this.httpClient.get(
      'http://nepal-dss.rimes.int/api_mobile/api_weather/ecmwf_4days_by_district_id_get?id=' + param.id
    );
  }

}
