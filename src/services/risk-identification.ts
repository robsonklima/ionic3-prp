import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Risk } from "../models/risk";
import { RiskIdentification } from "../models/risk-identification";

@Injectable()
export class RiskIdentificationService {
  
  constructor(private http: Http) { }

  getRiskIdentifications(risk: Risk): Observable<RiskIdentification[]> {
    return this.http.get(Settings.API_URL + 'risk-identifications/' + risk.riskId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  addRiskIdentification(riskIdentification: Object) {
    return this.http.post(Settings.API_URL + 'risk-identifications', riskIdentification)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateRiskIdentification(riskIdentification: any) {
    return this.http.put(Settings.API_URL + 'risk-identifications/' 
      + riskIdentification.riskIdentificationId, riskIdentification)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removeRiskIdentification(riskIdentificationId: number) {
    return this.http.delete(Settings.API_URL + 'risk-identifications/' + riskIdentificationId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}