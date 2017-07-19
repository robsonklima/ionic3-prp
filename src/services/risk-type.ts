import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Observable } from "rxjs/Observable";
import { RiskType } from '../models/risk-type';

@Injectable()
export class RiskTypeService {
    constructor(
      private http: Http
    ) {}

    getRiskTypes() : Observable<RiskType[]> {
      return this.http.get(Settings.API_URL + 'risk-types')
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(
          error.json().error));
    }   
}