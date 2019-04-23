import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class MakeService {

  constructor( private http: HttpClient ) { }

  public getMakes() {
    return this.http.get( 'https://localhost:5001/api/makes' );
  }

}