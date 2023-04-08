import { Realm } from "@realm/react";

export class Teacher extends Realm.Object<Teacher, "name"> {
  _id: Realm.BSON.ObjectId = new Realm.BSON.ObjectId();
  name!: string;
  description?: string;
  pictureURL?: string;

  static primaryKey = "_id";
}
