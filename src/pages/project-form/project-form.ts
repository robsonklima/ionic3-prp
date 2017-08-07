import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ToastController, 
  LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Project } from "../../models/project";
import { ProjectService } from '../../services/project';

@Component({
  selector: 'page-project-form',
  templateUrl: 'project-form.html'
})
export class ProjectFormPage implements OnInit {
  mode = 'New';
  project: Project;
  projectForm: FormGroup;

  constructor(
    private navParams: NavParams,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
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
                this.navCtrl.pop().then(() => {
                  this.handleMessage(res.success);
                })
              });
            },
            err => {
              loading.dismiss().then(() => {
                this.handleMessage(err.error);
              });
            }
          );
    } else {
      this.project = this.projectForm.value;

      this.projectService.addProject(this.project)
        .subscribe(
          res => {
            loading.dismiss().then(() => {
              this.navCtrl.popToRoot().then(() => {
                this.handleMessage(res.success);
              })
            });
          },
          err => {
            loading.dismiss().then(() => {
              this.handleMessage(err.error);
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
  
  private handleMessage(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    
    toast.present();
  }
}
