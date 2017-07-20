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
  ) { }

  getRisks(): Observable<Risk[]> {
    return this.http.get(Settings.API_URL + 'risks')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  addRisk(risk: Risk) {
    return this.http.post(Settings.API_URL + 'risks', risk)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateRisk(risk: Risk) {
    return this.http.put(Settings.API_URL + 'risks/' + risk.riskId, risk)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  removeRisk(risk: Risk) {
    return this.http.delete(Settings.API_URL + 'risks/' + risk.riskId)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}