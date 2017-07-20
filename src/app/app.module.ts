import { AuthService } from './../services/auth';
import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from "@angular/http";

import { MyApp } from './app.component';

import { ProjectPage } from '../pages/project/project';
import { ProjectsPage } from '../pages/projects/projects';
import { ProjectFormPage } from '../pages/project-form/project-form';
import { TabsPage } from '../pages/tabs/tabs';
import { RiskReviewsPage } from '../pages/risk-reviews/risk-reviews';
import { ActivitiesPage } from '../pages/activities/activities';
import { ActivityPage } from '../pages/activity/activity';
import { RiskPage } from '../pages/risk/risk';
import { ActivityService } from '../services/activity';
import { ProjectService } from './../services/project';
import { RiskService } from '../services/risk';
import { RiskFormPage } from '../pages/risk-form/risk-form';
import { RiskTypeService } from '../services/risk-type';
import { RiskCategoryService } from '../services/risk-category';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    TabsPage,
    ProjectsPage,
    ProjectPage,
    ProjectFormPage,
    ActivitiesPage,
    ActivityPage,
    RiskPage,
    RiskFormPage,
    RiskReviewsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    ProjectsPage,
    ProjectPage,
    ProjectFormPage,
    ActivitiesPage,
    ActivityPage,
    RiskPage,
    RiskFormPage,
    RiskReviewsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectService,
    ActivityService,
    RiskService,
    RiskTypeService,
    RiskCategoryService,
    AuthService
  ]
})
export class AppModule {}
