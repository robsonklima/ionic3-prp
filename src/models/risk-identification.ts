export class RiskIdentification {
    constructor(
      public riskIdentificationId: number,  
      public riskIdentificationUserId: number,
      public riskIdentificationResponse: string,
      public riskIdentificationAddedDate: string,
      public userId: number,
      public userName: string,
      public projectId: number,
      public projectName: string,
      public activityId: number,
      public activityTitle: string,
      public riskId: number,
      public riskTitle: string
    ) {}
}