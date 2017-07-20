import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from './../tabs/tabs';

import { AuthService } from './../../services/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  user = { userEmail: '', userPassword: '' };

  constructor(
    public navCtrl: NavController, 
    public authservice: AuthService
  ) {}

  ngOnInit() {
      this.authservice.destroyUserCredentials();
  }

  login(user) {
    this.authservice.authenticate(user).then(data => {
      if(data) {
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }
}