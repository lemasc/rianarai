import { Realm } from "@realm/react";

import { Subject } from "./Subject";

export class Teacher extends Realm.Object<Teacher, "name" | "description"> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  description?: string;
  //pictureURL?: string;
  subjects!: Realm.Types.LinkingObjects<Subject, "teachers">;
  userId!: string;

  static primaryKey = "_id";
}
