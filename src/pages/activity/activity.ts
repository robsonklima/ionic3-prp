import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RiskPage } from '../risk/risk';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage {
  tab: string = "home";

  constructor(
    private navCtrl: NavController
  ) {}

  onLoadRisk() {
    this.navCtrl.push(RiskPage);
  }

  onNewActivity() {
    
  }

  onEditActivity() {

  }

  onRemoveActivity() {
    
  }
}
