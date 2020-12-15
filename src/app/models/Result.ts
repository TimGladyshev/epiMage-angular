export class Result {
  id!:bigint;
  SampleID!:string;
  DNAmAge!:String;
  Comment!:String;
  noMissingPerSample!:bigint;
  meanMethBySample!:string;
  minMethBySample!:string;
  maxMethBySample!:string;
  predictedGender!:string;
  meanXchromosome!:string;
}
