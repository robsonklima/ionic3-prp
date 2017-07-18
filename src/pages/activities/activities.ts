import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ActivityPage } from '../activity/activity';

@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html'
})
export class ActivitiesPage {

  constructor(
    private navCtrl: NavController
  ) {}
  
  onLoadProject() {
    this.navCtrl.push(ActivityPage);
  }

}
