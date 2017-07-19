import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Project } from './../models/project';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProjectService {
    constructor(
      private http: Http
    ) {}

    getProjects() : Observable<Project[]> {
      return this.http.get(Settings.API_URL + 'projects')
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(
          error.json().error));
    }  
}