import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(
        error.json())
      );
  }  

  addProject(project: Project) {
    let body = JSON.stringify(project);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.post(Settings.API_URL + 'projects', body, options)
      .map((res:Response) => res)
      .catch((error: any) => Observable.throw(
        error.json())
      );
  }

  updateProject(project: Project) {
    let body = JSON.stringify(project);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });

    return this.http.put(Settings.API_URL + 'projects/' + project.projectId, body, options)
      .map((res:Response) => res)
      .catch((error: any) => Observable.throw(
        error.json())
      );
  }

  removeProject(project: Project) {
    return this.http.delete(Settings.API_URL + 'projects/' + project.projectId)
      .map((res:Response) => res)
      .catch((error: any) => Observable.throw(
        error.json())
      );
  }
}