import { Realm } from "@realm/react";

import { Teacher } from "./Teacher";
import { Work } from "./Work";

export class Course extends Realm.Object<Course, "name" | "userId"> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  description?: string;
  teachers: Realm.List<Teacher> = new Realm.List();
  works!: Realm.Types.LinkingObjects<Work, "subject">;
  userId!: string;

  static primaryKey = "_id";
}
