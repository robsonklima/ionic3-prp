import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, MenuController, LoadingController } from 'ionic-angular';

import { AuthService } from './../../services/auth';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.authService.destroyUserCredentials();
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = new FormGroup({
      'userEmail': new FormControl(null, Validators.required),
      'userPassword': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();

    this.authService.auth(this.loginForm.value)
      .subscribe(
        user => {
          this.authService.storeUserCredentials(user);
          this.navCtrl.setRoot(TabsPage);
          loading.dismiss();
        },
        err => { 
          this.handleMessage('Ops', err.error) 
          loading.dismiss();
        }
      );
  }

  private handleMessage(title: string, message: string) {
    const alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    });
    alert.present();
  }
}