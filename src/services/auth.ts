import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import { User } from '../models/user';

import { Settings } from './../settings/settings';

@Injectable()
export class AuthService {
    isLoggedin: boolean;
    token;
    user: User;

    constructor(
        public http: Http
    ) {
        this.http = http;
        this.isLoggedin = false;
        this.token = null;
    }

    public auth(user: User) {
        return this.http.post(Settings.API_URL + 'users/login', user)
            .map((res: Response) => res.json().user)
            .catch((error: any) => Observable.throw(error.json()));
    }

    public getToken() {
        return this.token;
    }

    public getUser() {
        return this.user;
    }

    public isLogged() {
        return this.isLoggedin;
    }

    public storeUserCredentials(user: User) {
        window.localStorage.setItem('Authorization', user.userToken);
        this.isLoggedin = true;
        this.token = user.userToken;
        this.user = user;
    }

    public destroyUserCredentials() {
        this.isLoggedin = false;
        this.token = null;
        window.localStorage.clear();
    }
}