import { Realm } from "@realm/react";

import { Course } from "./Course";

export class Work extends Realm.Object<Work, "name" | "subject"> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  description?: string;
  dueDate?: Date;
  completed: boolean = false;
  subject!: Course;

  static primaryKey = "_id";
}
