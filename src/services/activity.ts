import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Observable } from "rxjs/Observable";
import { Activity } from '../models/activity';

@Injectable()
export class ActivityService {
    constructor(
      private http: Http
    ) {}

    getActivities() : Observable<Activity[]> {
      return this.http.get(Settings.API_URL + 'activities')
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(
          error.json().error));
    }  

    getActivitiesByProject(projectId: number) : Observable<Activity[]> {
      return this.http.get(Settings.API_URL + 'activities/project/' + projectId)
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(
          error.json().error));
    } 
}