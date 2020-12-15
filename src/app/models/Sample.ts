import { Site } from "./Site";

export class Sample {
  id!:bigint;
  SampleID:string;
  sites:Site[];

  constructor(SampleID:string) {
    this.SampleID = SampleID;
    this.sites = [];
  }
}
