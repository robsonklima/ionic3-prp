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
import { RiskReviewFormPage } from './../pages/risk-review-form/risk-review-form';
import { RiskTypeService } from '../services/risk-type';
import { RiskCategoryService } from '../services/risk-category';
import { ActivityFormPage } from '../pages/activity-form/activity-form';
import { UserService } from '../services/user';
import { RiskReviewService } from '../services/risk-review';
import { RiskIdentificationService } from '../services/risk-identification';
import { RiskProblemService } from '../services/risk-problem';
import { AnalyticsPage } from '../pages/analytics/analytics';
import { AnalyticService } from '../services/analytic';

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
    ActivityFormPage,
    RiskPage,
    RiskFormPage,
    RiskReviewsPage,
    RiskReviewFormPage,
    AnalyticsPage
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
    ActivityFormPage,
    RiskPage,
    RiskFormPage,
    RiskReviewsPage,
    RiskReviewFormPage,
    AnalyticsPage
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
    AuthService,
    UserService,
    RiskReviewService,
    RiskIdentificationService,
    RiskProblemService,
    AnalyticService
  ]
})
export class AppModule {}
