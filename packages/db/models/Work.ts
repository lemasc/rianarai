import { BSON, Object } from "realm";

export class Work extends Object {
  _id: BSON.ObjectId = new BSON.ObjectId();
  name!: string;
  description?: string;
  dueDate?: Date;
  completed: boolean = false;
  //subject!: Subject;

  static primaryKey = "_id";

  constructor(realm: Realm, name: string) {
    super(realm, { name });
  }
}
