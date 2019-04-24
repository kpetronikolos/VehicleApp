import { Component, OnInit } from '@angular/core';
import { MakeService } from '../../services/make.service';
import { Make } from '../../models/Make';
import { Model } from '../../models/Model';

@Component( {
  selector: 'form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
} )
export class FormVehicleComponent implements OnInit {

  public makes: Make[];
  public models: Model[];
  public vehicle: any = {};
  public selectedMake: any;

  constructor( private makeService: MakeService ) { }

  ngOnInit() {
    this.makeService.getMakes().subscribe( ( makes: any[] ) => {
      this.makes = makes
    } );
  }

  public onMakeChanges(): void {
    // console.log( "Vehicle", this.vehicle );
    this.selectedMake = this.makes.find( m => m.id == this.vehicle.makeId );
    this.models = this.selectedMake ? this.selectedMake.models : [];

  }

}
