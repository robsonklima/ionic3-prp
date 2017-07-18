import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProjectPage } from '../project/project';

@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html'
})
export class ProjectsPage {

  constructor(
    private navCtrl: NavController
  ) {}
  
  onLoadProject() {
    this.navCtrl.push(ProjectPage);
  }

}
