import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from './../pages/login/login';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  isLogged: boolean;
  loginPage = LoginPage;
  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private menuCtrl: MenuController
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onHome() {
    this.nav.push(TabsPage);
    this.menuCtrl.close();
  }

  onAnalytics() {
    this.nav.push(AnalyticsPage);
    this.menuCtrl.close();
  }

  onLogoff() {
    this.nav.setRoot(this.loginPage);
    this.menuCtrl.close();
  }
}