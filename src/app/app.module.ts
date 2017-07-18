import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ProjectPage } from '../pages/project/project';
import { ProjectsPage } from '../pages/projects/projects';
import { TabsPage } from '../pages/tabs/tabs';
import { RiskReviewsPage } from '../pages/risk-reviews/risk-reviews';
import { ActivitiesPage } from '../pages/activities/activities';
import { ActivityPage } from '../pages/activity/activity';
import { RiskPage } from '../pages/risk/risk';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ProjectsPage,
    ProjectPage,
    ActivitiesPage,
    ActivityPage,
    RiskPage,
    RiskReviewsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ProjectsPage,
    ProjectPage,
    ActivitiesPage,
    ActivityPage,
    RiskPage,
    RiskReviewsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
