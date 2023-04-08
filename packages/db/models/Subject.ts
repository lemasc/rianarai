import { BSON, Object, List } from "realm";

import { Teacher } from "./Teacher";

export class Subject extends Object<Subject, "name"> {
  _id: BSON.ObjectId = new BSON.ObjectId();
  name!: string;
  description?: string;
  teachers: List<Teacher> = new List();
}
