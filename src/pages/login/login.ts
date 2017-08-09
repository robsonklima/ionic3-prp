import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, MenuController } from 'ionic-angular';

import { AuthService } from './../../services/auth';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';
import { UtilsService } from '../../services/utils';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private menuCtrl: MenuController,
    private navCtrl: NavController,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.menuCtrl.enable(false);
    this.initializeForm();
  }

  private initializeForm() {
    this.loginForm = new FormGroup({
      'userEmail': new FormControl(null, Validators.required),
      'userPassword': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const loading = this.loadingCtrl.create({ content: 'Please wait...' });
    loading.present();

    this.authService.auth(this.loginForm.value)
      .subscribe(
      user => {
        loading.dismiss().then(() => {
          this.navCtrl.setRoot(TabsPage).then(() => {
            this.authService.storeUserCredentials(user);
            this.menuCtrl.enable(true);
          })
        });
      },
      err => {
        loading.dismiss().then(() => {
          this.utilsService.handleAlert('Ops', err.error || 'Server Error');
        });
      }
      );
  }
}