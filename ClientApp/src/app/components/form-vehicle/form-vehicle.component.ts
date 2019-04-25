import { Component, OnInit } from '@angular/core';
import { MakeService } from '../../services/make.service';
import { Make } from '../../models/Make';
import { Model } from '../../models/Model';
import { Feature } from '../../models/Feature';
import { FeatureService } from '../../services/feature.service';

@Component( {
  selector: 'form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
} )
export class FormVehicleComponent implements OnInit {

  public makes: Make[];
  public models: Model[];
  public vehicle: any = {};
  public selectedMake: Make;

  public features: Feature[];

  constructor( private makeService: MakeService, private featureService: FeatureService ) { }

  ngOnInit() {
    this.makeService.getMakes().subscribe( ( makes: Make[] ) => {
      this.makes = makes
    } );

    this.featureService.getFeatures().subscribe( ( features: Feature[] ) => {
      this.features = features;
    } )
  }

  public onMakeChanges(): void {
    // console.log( "Vehicle", this.vehicle );
    this.selectedMake = this.makes.find( m => m.id == this.vehicle.makeId );
    this.models = this.selectedMake ? this.selectedMake.models : [];

  }

}
