import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Observable } from "rxjs/Observable";
import { Risk } from '../models/risk';

@Injectable()
export class RiskService {
    constructor(
      private http: Http
    ) {}

    getRisks() : Observable<Risk[]> {
      return this.http.get(Settings.API_URL + 'risks')
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(
          error.json().error));
    }  
}