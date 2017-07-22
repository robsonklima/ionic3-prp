import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';

@Injectable()
export class RiskIdentificationService {
  
  constructor(
    private http: Http
  ) { }

  addRiskIdentification(riskIdentification: Object) {
    let bodyString = JSON.stringify(riskIdentification);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(Settings.API_URL + 'risk-identifications', riskIdentification, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removeRiskIdentification(riskIdentificationId: number) {
    return this.http.delete(Settings.API_URL + 'risk-identifications/' + riskIdentificationId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}