import { Result } from "./Result";
import { Sample } from "./Sample";

export class Batch {
  id!:bigint;
  batchID!:string;
  annotation!:string;
  created!:string;
  completed!:string;
  contributing!:boolean;
  samples:Sample[];
  sampleNames:string[];
  results:Result[];

  constructor() {
      this.samples = [];
      this.sampleNames = [];
      this.results = [];
    }
}
