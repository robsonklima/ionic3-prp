export class Activity {
    constructor(
      public activityId: number,  
      public activityTitle: string,  
      public activityDetails: string,
      public activityAmountHours: number,
      public projectId: number,
      public userId: number,
      public activityAddedDate: string
    ) {}
}