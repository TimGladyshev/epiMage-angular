export class Site
{
  id!:bigint;
  ProbeID:string;
  val!:string;

  constructor(ProbeID:string, val:string) {
    this.ProbeID = ProbeID;
  }
}
