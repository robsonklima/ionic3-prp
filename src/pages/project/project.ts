import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Project } from './../../models/project';
import { ActivityPage } from '../activity/activity';
import { RiskPage } from '../risk/risk';

@Component({
  selector: 'page-project',
  templateUrl: 'project.html'
})
export class ProjectPage implements OnInit {
  tab: string = "home";
  project: Project;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams
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

  ngOnInit() {
    this.loadProject();
  }

  private loadProject() {
    this.project = this.navParams.get('project');
  }
}
