import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

import { User } from '../models/user';

import { Settings } from './../settings/settings';

@Injectable()
export class AuthService {
    isLoggedin: boolean;
    AuthToken;
    user: User;

    constructor(
        public http: Http
    ) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }

    auth(user: User) {
        return this.http.post(Settings.API_URL + 'users/login', user)
            .map((res: Response) => res.json().user)
            .catch((error: any) => Observable.throw(error.json()));
    }

    getToken() {
        return this.AuthToken;
    }

    getUser() {
        return this.user;
    }

    isLogged() {
        return this.isLoggedin;
    }

    storeUserCredentials(user: User) {
        window.localStorage.setItem('Authorization', user.userToken);
        this.isLoggedin = true;
        this.AuthToken = user.userToken;
        this.user = user;
    }

    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
    }
}