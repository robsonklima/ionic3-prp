import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';

@Injectable()
export class RiskIdentificationService {
  
  constructor(private http: Http) { }

  addRiskIdentification(riskIdentification: Object) {
    return this.http.post(Settings.API_URL + 'risk-identifications', riskIdentification)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removeRiskIdentification(riskIdentificationId: number) {
    return this.http.delete(Settings.API_URL + 'risk-identifications/' + riskIdentificationId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}