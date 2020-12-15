import { UpLoad } from "./Upload";

export class User {
  id!:string;
  username!:string;
  email!:string;
  roles!:string[];
  uploads!:UpLoad[];
  batchCount!:bigint;
  completedCount!:bigint;
  sharedCount!:bigint;
}
