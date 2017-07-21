export class RiskIdentification {
    constructor(
      public riskIdentificationId: number,  
      public riskIdentificationUserId: number,
      public riskIdentificationProjectId: number,
      public riskIdentificationActivityId: number,
      public riskIdentificationRiskId: number,
      public riskIdentificationAddedDate: string
    ) {}
}