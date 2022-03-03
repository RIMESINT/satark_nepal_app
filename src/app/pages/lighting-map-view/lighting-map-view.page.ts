import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../providers/api.service';
// import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import * as mapboxgl from 'mapbox-gl';
import { forkJoin } from 'rxjs';

declare var google:any;

@Component({
  selector: 'app-lighting-map-view',
  templateUrl: './lighting-map-view.page.html',
  styleUrls: ['./lighting-map-view.page.scss'],
})
export class LightingMapViewPage implements OnInit {

  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;
  public lightning30min_data: any;
  public polygon_data: any;
  public m_points_data: any;
  public flash_data: any;
  public cg_data: any;
  severity_data: string;
  cg_time: any = [];
  cg_latitude: any = [];
  cg_longitude: any = [];
  cg_timeframe: any = [];
  public low_value: any;
  public moderate_value: any;
  public high_value: any;
  local_name: string;
  latitude: any=[];
  longitude: any=[];
  severity: any=[];
  timeframe: any = [];
  markers = [];

  constructor(private httpClient: HttpClient, private loadingCtrl: LoadingController, private api: ApiService, private toastCtrl: ToastController) { }

  show_map(){
  	const location = new google.maps.LatLng(27.700769,84.300140);

    //map options
    const options = {
      center: location,
      zoom : 6,
      disableDefaultUI: true,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, options);

    //load geojson
    this.map.data.loadGeoJson('assets/geojson/nepal_shp/nepal_block.geojson');
    this.load_OverviewAjaxBlock30Min();
    this.load_earthnetPolygon();
  }

  mapInit() {
    this.loadingCtrl
      .create({
        spinner: 'bubbles',
        cssClass: 'loader-css-class',
        mode: 'ios',
        duration: 10000,
      }).then((loadingEl)=>{
          loadingEl.present();
          mapboxgl.accessToken = 'pk.eyJ1Ijoic3VwZXJkb3plIiwiYSI6ImNreWk0bGJ5YTI4dGIycW84dDU1emw2eG8ifQ.zUCe5RZtHPSqBo6vKneGdQ';
          this.map = new mapboxgl.Map({
            container: 'map',
            attributionControl: false,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [84.300140,27.700769],
            // center: [84.5121, 20.5012],
            zoom: 5,
          });
          this.map.on('load', () => {
            this.map.addSource('block', {
              type: 'geojson',
              data: './assets/geojson/nepal_shp/nepal_block.geojson',
              // data: './assets/geojson/Odisha_Dist.geojson',
            });

          setTimeout(() => this.map.resize(), 0);
          document.getElementById('map').style.opacity = '1';
          // document.getElementById('skeleton').style.display = 'none';

          this.map.addLayer({
            id: 'block-layer',
            type: 'fill',
            source: 'block',
            paint: {
              'fill-color': 'white',
              'fill-opacity': 0.5,
              'fill-outline-color':'red',
            },
          });
          // this.map.addLayer({
          //   id: 'block-outline',
          //   type: 'line',
          //   source: 'block',
          //   paint: {
          //     'line-color': 'black',
          //     'line-width': 1,
          //   },
          // });
          console.log("layer added");
          loadingEl.dismiss();
          // this.map.on('click', 'block-layer', (e) => {
          //   console.log(e.features[0].properties);
          //   // this.onClick(e.features[0].properties.SlNo);
          // });
        });
      });
      // this.load_OverviewAjaxBlock30Min();
      // this.load_earthnetPolygon();
      this.load_DataMarker();
  }
  
  ///load CDS data
  load_OverviewAjaxBlock30Min(){
    let flash_type = this.api.get_OverviewAjaxBlock30Min();
    forkJoin([flash_type]).subscribe((results) => {
      this.lightning30min_data = results[0];
      this.flash_data = this.lightning30min_data['flash'];
      this.low_value = this.lightning30min_data['low'];
      this.moderate_value = this.lightning30min_data['moderate'];
      this.high_value = this.lightning30min_data['high'];
      console.log('high', this.high_value);
      console.log('low', this.low_value);
      console.log('moderate', this.moderate_value);
      console.log('flash data', this.flash_data);
      if (this.lightning30min_data.length != 0) {
        if (this.flash_data != null) {
          console.log("flash data....",this.flash_data);
          this.map.on('idle', () => {
            this.updateFeature();
          });
        } else {
          // this.authService.showErrorToastTop(
          //   'No Lightning activity currently!'
          // );
        }
      } else {
        console.log('error');
        this.presentToast('Data is not available currently!');
      }
    });  
  }

  //load polygons
  load_earthnetPolygon(){
    this.api.getLxAlerts()
      .subscribe(data=>{
        console.log("eartnet data...", data);
    //   })
    // this.httpnative.get('https://api.lxalerts.earthnetworks.com/CellAlerts.aspx?level=1,2,3&nwlat=37.69027&nwlon=62.69888&selat=4.50111&selon=101.033611&format=json&partnerid=B491167B-6969-4A35-893D-0FEE54C6F926',{},{})
    // .then(data =>{
    //   this.polygon_data = JSON.parse(data.data);
      this.polygon_data = data;
      console.log('poly data', this.polygon_data);
      if(this.polygon_data.length != 0 || this.polygon_data == null){
        console.log('poly data length', this.polygon_data.length);
        for(var q=0; q < this.polygon_data.length; q++){
          this.m_points_data = this.polygon_data[q].Location._geometry.m_points;
          this.severity_data = this.polygon_data[q].Severity;
          console.log("severity", this.severity_data);
          ///if severity is medium polygon is blue and if high its red
          if(this.severity_data == "Medium"){
            this.m_points_data = this.polygon_data[q].Location._geometry.m_points;
            console.log('m_pointssssssss',this.m_points_data);
            for(var i=0; i < this.m_points_data.length; i++){
              var lat = this.m_points_data[i].x;
              var long = this.m_points_data[i].y;
              this.latitude.push(lat);
              this.longitude.push(long);
              console.log('mlats', this.latitude); //push lat and long to array
              console.log('mlongs', this.longitude);
              if(this.latitude.length == 5){
                var triangleCoords = [];
                for(var j=0; j<this.latitude.length;j++){
                  triangleCoords.push({lat: this.latitude[j], lng: this.longitude[j]}); //push 5 lat and 5 long to make polygon
                  console.log('coordsssssssssssss', triangleCoords);
                  }
                  if (this.map.getLayer('medium-layer') != null) {
                    this.map.removeLayer('medium-layer');
                  }
                  this.map.addSource('medium', {
                    type: 'geojson',
                    data: {
                      type: 'Feature',
                      geometry: {
                        type: 'Polygon',
                        coordinates: [triangleCoords],
                      },
                    },
                  });
                  this.map.addLayer({
                    id: 'medium-layer',
                    type: 'fill',
                    source: 'medium',
                    layout: {},
                    paint: {
                      'fill-color': 'blue',
                      'fill-opacity': 0.4,
                    },
                  });
                  this.latitude = [];
                  this.longitude = [];
                  console.log("end of medium"); 
                }
              }
          } else if(this.severity_data == "High"){
            this.m_points_data = this.polygon_data[q].Location._geometry.m_points;
            console.log('m_pointssssssss',this.m_points_data);
            for(var i=0; i < this.m_points_data.length; i++){
              var lat = this.m_points_data[i].x;
              var long = this.m_points_data[i].y;
              this.latitude.push(lat);
              this.longitude.push(long);
              console.log('mlats', this.latitude); //push lat and long to array
              console.log('mlongs', this.longitude);
              if(this.latitude.length == 5){
                var triangleCoords = [];
                for(var j=0; j<this.latitude.length;j++){
                  triangleCoords.push({lat: this.latitude[j], lng: this.longitude[j]}); //push 5 lat and 5 long to make polygon
                  console.log('coordsssssssssssss', triangleCoords);
                }
                if (this.map.getLayer('high-layer') != null) {
                  this.map.removeLayer('high-layer');
                }
                this.map.addSource('high', {
                  type: 'geojson',
                  data: {
                    type: 'Feature',
                    geometry: {
                      type: 'Polygon',
                      coordinates: [triangleCoords],
                    },
                  },
                });
                this.map.addLayer({
                  id: 'high-layer',
                  type: 'fill',
                  source: 'high',
                  layout: {},
                  paint: {
                    'fill-color': '#FF0000',
                    'fill-opacity': 1,
                  },
                });
                this.latitude = [];
                this.longitude = [];
                console.log("end of high");
              }
            }
          } else if(this.severity == "Low"){
            console.log("do nothing for low");
          }
        }
      } else {
        this.presentToast("No significant DTA");
      } 
    });
  }

  ///load lightning data marker
  load_DataMarker() {
    //get data from api and send to map
    this.api.get_OverviewAjaxBlock30Min()
      .subscribe(
        (data) => {
          console.log('now data', data);
          this.lightning30min_data = data;
          this.cg_data = data['CG'];
          console.log('CG data', this.cg_data);
          this.updateMap();
        },
        (Error) => {
          this.presentToast('Network Error.Please try later!');
        }
    );
  }

  //update map for marker
  updateMap(){
    if (this.lightning30min_data != null) {
      if (this.cg_data.length != 0) {
        for (var j = 0; j < this.cg_data.length; j++) {
          var cg_lati = this.cg_data[j].latitude;
          var cg_long = this.cg_data[j].longitude;
          var cg_lightning_time = this.cg_data[j].lightning_time;
          var tframe = this.cg_data[j].time_frame;
          this.cg_latitude.push(cg_lati);
          this.cg_longitude.push(cg_long);
          this.cg_time.push(cg_lightning_time);
          this.timeframe.push(tframe);
        }
        this.removeMarkers();
        for (var t = 0; t < this.timeframe.length; t++) {
          let el = document.createElement('div');
          el.classList.add('marker');
          // if (this.timeframe[t] >= 1201 && this.timeframe[t] <= 1800) {
            var s =
              '<div style="height:40px;width:40px;text-overflow: ellipsis; display:flex;align-items:center;justify-content:center;"><ion-img src="../assets/images/lightning/map/lightning_yellow_ic.svg"</ion-img></div>';
            el.innerHTML = s;
            const marker = new mapboxgl.Marker({ element: el })
              .setLngLat([this.cg_longitude[t], this.cg_latitude[t]])
              .setPopup(
                new mapboxgl.Popup({
                  closeOnClick: true,
                }).setHTML(this.cg_time[t])
              )
              .addTo(this.map);

            this.markers.push(marker);
          // }
        }
      }
    } else {
      this.presentToast(
        'No significant lightning or thunderstorm activity.'
      );
    }
  }

  removeMarkers() {
    if (this.markers.length != 0) {
      this.markers.forEach((element) => {
        element.remove();
      });
      this.markers = null;
      this.markers = [];
    }
  }

  //update google maps
  updateGoogleMapsFeature(){
    this.map.data.setStyle(function(feature){
      let blk_name = feature.getProperty('LOCAL');
      console.log('heo jsonblock', blk_name);
    });
  }

  //color blocks based on the flash intensity
  updateFeature() {
    var block: any;
    var low: any;
    var high: any;
    var moderate: any;
    block = this.flash_data;
    low = this.low_value;
    high = this.high_value;
    moderate = this.moderate_value;
    var matchExpression = null;
    matchExpression = ['match', ['get', 'LOCAL']];
    console.log("matchExpression..", matchExpression);
    const features = this.map.queryRenderedFeatures({
      layers: ['block-layer'],
    });
    // console.log("feature..", features);
    const unique = [...new Set(features.map((item) => item.properties.LOCAL))];
    // console.log("unique..", unique);
    var f1: any = [];
    f1 = unique;
    if (f1.length != 0 && block.length != 0) {
      f1.forEach((element) => {
        let local_name = element;
        console.log("flash block name...", block[0]);
        // console.log("local_name...", block[local_name]);
        if (!block[local_name]) {
          matchExpression.push(element, 'white');
        }
        let ground_value = block[local_name].ground;

        console.log(
           'ground' + ground_value
        );
        // if (ground_value >= low && ground_value <= moderate) {
        //   matchExpression.push(element, 'blue');
        // } else if (ground_value >= high) matchExpression.push(element, 'red');
        // else matchExpression.push(element, 'white');
      });
      // matchExpression.push('white');
      // if (this.map.getSource('block') != null && matchExpression) {
      //   this.map.addLayer({
      //     id: 'block-layer2',
      //     type: 'fill',
      //     source: 'block',
      //     paint: {
      //       'fill-color': matchExpression,
      //       'fill-opacity': 0.7,
      //     },
      //   });
      // }
    }
  }

  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    // this.show_map();
    this.mapInit();
  }

  // ngAfterViewInit(): void {
  //   // this.mapInit();
  //   this.show_map();
  // }

}
