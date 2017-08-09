import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Project } from "../../models/project";
import { ProjectService } from '../../services/project';
import { UtilsService } from '../../services/utils';

@Component({
  selector: 'page-project-form',
  templateUrl: 'project-form.html'
})
export class ProjectFormPage implements OnInit {
  mode = 'New';
  project: Project;
  projectForm: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private navParams: NavParams,
    private navCtrl: NavController,
    private projectService: ProjectService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');

    if (this.mode == 'Edit')
      this.project = this.navParams.get('project');
    
    this.initializeForm();
  }

  onSubmit() {
    const loading = this.loadingCtrl.create({ 
      content: 'Please wait...' 
    });
    loading.present();

    if (this.mode == 'Edit') {
      this.project.projectName = this.projectForm.value.projectName;
      this.project.projectScope = this.projectForm.value.projectScope;

      this.projectService.updateProject(this.project)
        .subscribe(
            res => {
              loading.dismiss().then(() => {
                this.utilsService.handleToast(res.success).then(() => {
                  this.navCtrl.pop();
                });
              });
            },
            err => {
              loading.dismiss().then(() => {
                this.utilsService.handleToast(err.error);
              });
            }
          );
    } else {
      this.project = this.projectForm.value;

      this.projectService.addProject(this.project)
        .subscribe(
          res => {
            loading.dismiss().then(() => {
              this.utilsService.handleToast(res.success).then(() => {
                this.navCtrl.popToRoot();
              });
            });
          },
          err => {
            loading.dismiss().then(() => {
              this.utilsService.handleToast(err.error);
            });
          }
        );
    }
  }

  private initializeForm() {
    let projectName = null;
    let projectScope = null;

    if (this.mode == 'Edit') {
      projectName = this.project.projectName;
      projectScope = this.project.projectScope;
    }

    this.projectForm = new FormGroup({
      'projectName': new FormControl(projectName, Validators.required),
      'projectScope': new FormControl(projectScope, Validators.required)
    });
  }
}
