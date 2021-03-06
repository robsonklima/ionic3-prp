import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Activity } from '../../models/activity';
import { User } from '../../models/user';
import { Project } from "../../models/project";
import { ActivityService } from '../../services/activity';
import { ProjectService } from '../../services/project';
import { UserService } from '../../services/user';
import { UtilsService } from '../../services/utils';

@Component({
  selector: 'page-activity-form',
  templateUrl: 'activity-form.html'
})
export class ActivityFormPage implements OnInit {
  mode = 'New';
  activity: Activity;
  projects: Project[];
  users: User[];
  activityForm: FormGroup;

  constructor(
    private utilsService: UtilsService,
    private navParams: NavParams,
    private navCtrl: NavController,
    private activityService: ActivityService,
    private projectService: ProjectService,
    private userService: UserService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');

    if (this.mode == 'Edit')
      this.activity = this.navParams.get('activity');
    
    this.initializeForm();
    this.loadProjects();
    this.loadUsers();
  }

  onSubmit() {
    const loading = this.loadingCtrl.create({ 
      content: 'Please wait...' 
    });
    loading.present();

    if (this.mode == 'Edit') {
      this.activity.activityTitle = this.activityForm.value.activityTitle;
      this.activity.activityDetails = this.activityForm.value.activityDetails;
      this.activity.activityAmountHours = this.activityForm.value.activityAmountHours;
      this.activity.projectId = this.activityForm.value.projectId;
      this.activity.userId = this.activityForm.value.userId;

      this.activityService.updateActivity(this.activity)
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
      this.activity = this.activityForm.value;

      this.activityService.addActivity(this.activity)
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
    let activityTitle = null;
    let activityDetails = null;
    let activityAmountHours = null;
    let projectId = null;
    let userId = null;

    if (this.mode == 'Edit') {
      activityTitle = this.activity.activityTitle;
      activityDetails = this.activity.activityDetails;
      activityAmountHours = this.activity.activityAmountHours;
      projectId = this.activity.projectId;
      userId = this.activity.userId;
    }

    this.activityForm = new FormGroup({
      'activityTitle': new FormControl(activityTitle, Validators.required),
      'activityDetails': new FormControl(activityDetails, Validators.required),
      'activityAmountHours': new FormControl(activityAmountHours, Validators.required),
      'projectId': new FormControl(projectId, Validators.required),
      'userId': new FormControl(userId, Validators.required)
    });
  }

  private loadProjects() {
    this.projectService.getProjects()
      .subscribe(
        projects => { 
          this.projects = projects;
        },
        err => {});
  }

  private loadUsers() {
    this.userService.getUsers()
      .subscribe(
        users => { 
          this.users = users;
        },
        err => {});
  }
}
