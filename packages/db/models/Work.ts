import { Realm } from "@realm/react";

import { Subject } from "./Subject";

export class Work extends Realm.Object<Work, "name" | "subject"> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  description?: string;
  dueDate?: Date;
  completed: boolean = false;
  subject!: Subject;

  static primaryKey = "_id";
}
