import { Settings } from './../settings/settings';
import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class AuthService {
    isLoggedin: boolean;
    AuthToken;
    user;
    
    constructor(public http: Http) {
        this.http = http;
        this.isLoggedin = false;
        this.AuthToken = null;
    }
    
    storeUserCredentials(token) {
        window.localStorage.setItem('Authorization', token);
        this.isLoggedin = true;
        this.AuthToken = token;
    }

    destroyUserCredentials() {
        this.isLoggedin = false;
        this.AuthToken = null;
        window.localStorage.clear();
    }
    
    authenticate(user) {
        let credentials = "userEmail=" + user.userEmail + "&userPassword=" + user.userPassword;
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        
        return new Promise(resolve => {
            this.http.post(Settings.API_URL + 'users/login', credentials, { headers: headers })
                .subscribe(data => {
                    if(data.json().user){
                        this.storeUserCredentials(data.json().user.userToken);
                        resolve(true);
                    }
                    else
                        resolve(false);
                });
        });
    }

    getToken() {
        return this.AuthToken;
    }
    
    logout() {
        this.destroyUserCredentials();
    }
}