import { Component, OnInit } from '@angular/core';
import { MakeService } from '../../services/make.service';

@Component( {
  selector: 'form-vehicle',
  templateUrl: './form-vehicle.component.html',
  styleUrls: ['./form-vehicle.component.css']
} )
export class FormVehicleComponent implements OnInit {

  public makes;

  constructor( private makeService: MakeService ) { }

  ngOnInit() {
    this.makeService.getMakes().subscribe( makes => this.makes = makes );
  }

}
