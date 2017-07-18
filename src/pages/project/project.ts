import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ActivityPage } from '../activity/activity';
import { RiskPage } from '../risk/risk';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage {
  tab: string = "home";

  constructor(
    private navCtrl: NavController
  ) {}

  onLoadActivity() {
    this.navCtrl.push(ActivityPage);
  }

  onLoadRisk() {
    this.navCtrl.push(RiskPage);
  }

  onEditProject() {

  }

  onRemoveProject() {
    
  }

  onNewProject() {
    
  }
}
