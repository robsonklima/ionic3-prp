import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { Settings } from './../settings/settings';
import { Observable } from "rxjs/Observable";
import { User } from '../models/user';

@Injectable()
export class UserService {
  constructor(
    private http: Http
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get(Settings.API_URL + 'users')
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}