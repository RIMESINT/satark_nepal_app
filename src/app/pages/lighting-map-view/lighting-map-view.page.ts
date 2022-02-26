import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var google:any;

@Component({
  selector: 'app-lighting-map-view',
  templateUrl: './lighting-map-view.page.html',
  styleUrls: ['./lighting-map-view.page.scss'],
})
export class LightingMapViewPage implements OnInit {

  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map : any;

  constructor() { }

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
    this.map.data.loadGeoJson('assets/geojson/nepal_shp/nepal_district.geojson');
    // this.barrage_layer = new google.maps.Data({map: this.map});
    // this.barrage_layer.loadGeoJson('assets/geojson/barrages.geojson');
  }

  ngOnInit() {
    this.show_map();
  }

}
